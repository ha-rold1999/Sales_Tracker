using Models.Model.Expense;
using SalesTracker.EntityFramework;

namespace SalesTracker.DatabaseHelpers.DateReport
{
    public class ExpenseDateHelper
    {
        private DatabaseContext _databaseContext;

        public ExpenseDateHelper(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public Expense GetLastReport()
        {
            return _databaseContext.Expense.FirstOrDefault(x => x.Date == DateOnly.FromDateTime(DateTime.Now))
                ?? AddReport(new Expense() { Date = DateOnly.FromDateTime(DateTime.Now) });
        }

        public Expense AddReport(Expense expense)
        {
            _databaseContext.Expense.Add(expense);
            _databaseContext.SaveChanges();
            return expense;
        }
    }
}
