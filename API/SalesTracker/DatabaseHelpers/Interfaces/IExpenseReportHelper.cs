using Models.Model.Expense;
using Models.Model.Expense.Expenses;
using Models.Model.Expense.Reports;

namespace SalesTracker.DatabaseHelpers.Interfaces
{
    public interface IExpenseReportHelper
    {
        ExpenseReport AddExpense(ExpenseReport expenseReport);
        ExpenseReport GetLastReport(Expense expense);
        ExpenseReport UpdateExpenseReport(Expenses expenses, ExpenseReport expenseReport);
    }
}