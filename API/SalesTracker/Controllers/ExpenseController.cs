using CustomException;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.Model.Expense;
using Models.Model.Expense.Reports;
using Models.Model.Items;
using Models.Model.Sale.Reports;
using Models.Model.Sale.Sales;
using Models.Model.Sale;
using SalesTracker.DatabaseHelpers;
using SalesTracker.DatabaseHelpers.DailyReport;
using SalesTracker.DatabaseHelpers.DateReport;
using Models.Model.Expense.Expenses;
using AutoMapper;

namespace SalesTracker.Controllers
{
    public class ExpenseController : Controller
    {
        private IExpenseHelper _expenseHelper;
        private IExpenseDateHelper _expenseDateHelper;
        private IExpenseReportHelper _expenseReportHelper;
        private ILogger<ExpenseController> _logger;
        private IMapper _mapper;
        private Expense expenseDate;
        private ExpenseReport expenseReport;

        public ExpenseController(
            IExpenseHelper expenseHelper,
            IExpenseDateHelper expenseDateHelper,
            IExpenseReportHelper expenseReportHelper,
            ILogger<ExpenseController> logger,
            IMapper mapper)
        {
            _expenseHelper = expenseHelper;
            _expenseDateHelper = expenseDateHelper;
            _expenseReportHelper = expenseReportHelper;
            _logger = logger;
            _mapper = mapper;

            expenseDate = _expenseDateHelper.GetLastReport();
            expenseReport = _expenseReportHelper.GetLastReport(expenseDate);

        }

        [HttpPost]
        [Route("api/[controller]/AddReport")]
        public IActionResult AddReport([FromBody]ExpensesDTO[] expenses)
        {
            try
            {
                foreach (var expense in expenses)
                {
                    var exp = _mapper.Map<Expenses>(expense);
                    exp.Expense = expenseDate;

                    if (exp.Quantity <= 0) throw new SalesQuantityException();

                    _expenseHelper.Add(exp);
                    _expenseReportHelper.UpdateExpenseReport(exp, expenseReport);
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

        [HttpGet]
        [Route("api/[controller]/GetItemExpenseReport/{id}")]
        public IActionResult GetItemExpenseReport(int id)
        {
            try
            {
                return Ok(_expenseHelper.GetItemExpense(id));
            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message}");
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        [Route("api/[controller]/GetDailyExpenseReport")]
        public IActionResult GetDailyExpenseReport()
        {
            try
            {
                return Ok(_expenseHelper.GetDailyExpense());
            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message}");
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        [Route("api/[controller]/GetCurrentDateExpenseReport")]
        public IActionResult GetCurrentDateExpenseReport()
        {
            try
            {
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
