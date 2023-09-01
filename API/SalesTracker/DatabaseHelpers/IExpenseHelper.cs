using Models.Model.Expense.Expenses;
using Models.Model.Expense.Reports;

namespace SalesTracker.DatabaseHelpers
{
    public interface IExpenseHelper
    {
        Expenses Add(Expenses expenses);
        List<ExpenseReport> GetDailyExpense();
        List<Expenses> GetItemExpense(int id);
    }
}