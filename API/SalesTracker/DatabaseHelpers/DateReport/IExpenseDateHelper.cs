using Models.Model.Expense;

namespace SalesTracker.DatabaseHelpers.DateReport
{
    public interface IExpenseDateHelper
    {
        Expense AddReport(Expense expense);
        Expense GetLastReport();
    }
}