using Microsoft.AspNetCore.Mvc;
using Models.Model.Account.Information;
using Models.Model.Expense.Expenses;

namespace SalesTracker.Controllers.Interfaces
{
    public interface IExpenseController
    {
        IActionResult AddExpense([FromBody] ExpensesDTO[] expenses);
        IActionResult GetCurrentDateExpenseReport([FromBody] StoreInformation storeInformation);
        IActionResult AddItemExpense([FromBody] ExpensesDTO expense);
        IActionResult GetItemExpenseReport(int id)
    }
}