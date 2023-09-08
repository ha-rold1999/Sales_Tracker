using Microsoft.AspNetCore.Mvc;
using Models.Model.Account.Information;
using Models.Model.Expense.Expenses;

namespace SalesTracker.Controllers.Interfaces
{
    public interface IExpenseController
    {
        IActionResult AddExpense([FromBody] ExpenseBody expenseBody);
        IActionResult GetCurrentDateExpenseReport([FromBody] StoreInformation storeInformation);
        IActionResult AddItemExpense([FromBody] ExpenseBodyItem expenseBody);
        IActionResult GetItemExpenseReport(int id);
    }
}