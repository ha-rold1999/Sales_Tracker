using Microsoft.AspNetCore.Mvc;
using Models.Model.Account.Information;
using Models.Model.Expense.Expenses;

namespace SalesTracker.Controllers.Interfaces
{
    public interface IExpenseController
    {
        IActionResult AddExpense([FromBody] IExpensesDTO[] expenses);
        IActionResult GetCurrentDateExpenseReport([FromBody] StoreInformation storeInformation);
    }
}