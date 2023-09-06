using Models.Model.Account.Information;
using Models.Model.Expense;

namespace SalesTracker.DatabaseHelpers.Interfaces
{
    public interface IExpenseDateHelper
    {
        Expense AddReport(Expense expense);
        Expense GetLastReport(StoreInformation storeInformation);
    }
}