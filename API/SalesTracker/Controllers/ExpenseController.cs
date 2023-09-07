using CustomException;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.Model.Expense;
using Models.Model.Expense.Reports;
using Models.Model.Items;
using Models.Model.Sale.Reports;
using Models.Model.Sale.Sales;
using Models.Model.Sale;
using Models.Model.Expense.Expenses;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Models.Model.Account.Information;
using Microsoft.Extensions.Caching.Memory;
using SalesTracker.Controllers.Interfaces;
using SalesTracker.DatabaseHelpers.Interfaces;

namespace SalesTracker.Controllers
{
    public class ExpenseController : Controller, IExpenseController
    {
        private IExpenseHelper _expenseHelper;
        private IExpenseDateHelper _expenseDateHelper;
        private IExpenseReportHelper _expenseReportHelper;
        private ILogger<ExpenseController> _logger;
        private IMapper _mapper;
        private IMemoryCache _cache;

        public ExpenseController(
            IExpenseHelper expenseHelper,
            IExpenseDateHelper expenseDateHelper,
            IExpenseReportHelper expenseReportHelper,
            ILogger<ExpenseController> logger,
            IMapper mapper,
            IMemoryCache cache)
        {
            _expenseHelper = expenseHelper;
            _expenseDateHelper = expenseDateHelper;
            _expenseReportHelper = expenseReportHelper;
            _logger = logger;
            _mapper = mapper;
            _cache = cache;
        }

        [Authorize]
        [HttpPost]
        [Route("api/[controller]/AddExpense")]
        public IActionResult AddExpense([FromBody] ExpensesDTO[] expenses)
        {
            try
            {
                foreach (var expense in expenses)
                {
                    var exp = _mapper.Map<Expenses>(expense);
                    exp.Expense = GetCachedExpense();

                    if (exp.Quantity <= 0) throw new SalesQuantityException();

                    _expenseHelper.Add(exp);
                    _expenseReportHelper.UpdateExpenseReport(exp, GetCachedExpenseReport());
                }
                return Ok(expenses);

            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }
            catch (SalesQuantityException)
            {
                return BadRequest();
            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        public IActionResult AddExpense([FromBody] IExpensesDTO[] expenses)
        {
            throw new NotImplementedException();
        }

        [Authorize]
        [HttpPost]
        [Route("api/[controller]/GetCurrentDateExpenseReport")]
        public IActionResult GetCurrentDateExpenseReport([FromBody] StoreInformation storeInformation)
        {
            try
            {
                var expenseDate = _expenseDateHelper.GetLastReport(storeInformation);
                var expenseReport = _expenseReportHelper.GetLastReport(expenseDate);
                _cache.Set("CurrentDateExpense", expenseDate, TimeSpan.FromMinutes(120));
                _cache.Set("ExpenseReport", expenseReport, TimeSpan.FromSeconds(120));

                return Ok(expenseReport);
            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        private Expense? GetCachedExpense()
        {
            if (_cache.TryGetValue("CurrentDateExpense", out Expense expenseDate))
            {
                return expenseDate;
            }
            return null;
        }

        private ExpenseReport? GetCachedExpenseReport()
        {
            if (_cache.TryGetValue("ExpenseReport", out ExpenseReport expenseReport))
            {
                return expenseReport;
            }
            return null;
        }
    }
}
