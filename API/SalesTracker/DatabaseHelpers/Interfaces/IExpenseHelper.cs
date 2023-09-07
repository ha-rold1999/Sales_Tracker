using Models.Model.Expense.Expenses;
using Models.Model.Expense.Reports;

namespace SalesTracker.DatabaseHelpers.Interfaces
{
    public interface IExpenseHelper
    {
        Expenses Add(Expenses expenses);
        List<Expenses> GetItemExpense(int id);
    }
}