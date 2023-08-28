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

namespace SalesTracker.Controllers
{
    public class ExpenseController : Controller
    {
        private ExpenseHelper _expenseHelper;
        private ExpenseDateHelper _expenseDateHelper;
        private ExpenseReportHelper _expenseReportHelper;
        private ILogger<ExpenseController> _logger;
        private Expense expenseDate;
        private ExpenseReport expenseReport;

        public ExpenseController(ExpenseHelper expenseHelper, ExpenseDateHelper expenseDateHelper, ExpenseReportHelper expenseReportHelper, ILogger<ExpenseController> logger)
        {
            _expenseHelper = expenseHelper;
            _expenseDateHelper = expenseDateHelper;
            _expenseReportHelper = expenseReportHelper;
            _logger = logger;

            expenseDate = _expenseDateHelper.GetLastReport();
            expenseReport = _expenseReportHelper.GetLastReport(expenseDate);

        }

        [HttpPost]
        [Route("api/[controller]/AddReport")]
        public IActionResult AddReport([FromBody]Expenses[] expenses)
        {
            try
            {
                foreach (var expense in expenses)
                {
                    expense.Expense = expenseDate;
                    _expenseHelper.Add(expense);
                    _expenseReportHelper.UpdateExpenseReport(expense, expenseReport);
                }
                return Ok(expenses);

            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest($"Item does not exist");
            }
            catch (SalesQuantityException)
            {
                return BadRequest("");
            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message}");
                return BadRequest(ex.Message);
            }
        }
    }
}
