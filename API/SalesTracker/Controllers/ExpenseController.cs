using AutoMapper;
using CustomException;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Models.Model.Account.Information;
using Models.Model.Expense;
using Models.Model.Expense.Expenses;
using Models.Model.Expense.Reports;
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
        public IActionResult AddExpense([FromBody] ExpenseAPIBody expenseBody)
        {
            try
            {
                foreach (var expense in expenseBody.expenses)
                {
                    var exp = _mapper.Map<Expenses>(expense);
                    exp.Expense = expenseBody.expenseReport.Expense;

                    if (exp.Quantity <= 0) throw new SalesQuantityException();

                    _expenseHelper.Add(exp);
                    _expenseReportHelper.UpdateExpenseReport(exp, expenseBody.expenseReport);
                }
                return Ok();

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

        [Authorize]
        [HttpPost]
        [Route("api/[controller]/AddItemExpense")]
        public IActionResult AddItemExpense([FromBody] ExpenseAPIBodyItem expenseBody)
        {
            try
            {
                var exp = _mapper.Map<Expenses>(expenseBody.expense);
                exp.Expense = expenseBody.expenseReport.Expense;

                if (exp.Quantity <= 0) throw new SalesQuantityException();

                _expenseHelper.AddItemExpense(exp);
                var newExpenseReport = _expenseReportHelper.UpdateExpenseReport(exp, expenseBody.expenseReport);
                return Ok(newExpenseReport);

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

        [Authorize]
        [HttpGet]
        [Route("api/[controller]/GetItemExpenseReport/{id}")]
        public IActionResult GetItemExpenseReport(int id)
        {
            var expenses = _expenseHelper.GetItemExpense(id);
            return Ok(expenses);
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
    }
}
