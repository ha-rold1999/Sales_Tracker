using Models.Model.Account.Information;
using Models.Model.Expense;
using SalesTracker.DatabaseHelpers.Interfaces;
using SalesTracker.EntityFramework;

namespace SalesTracker.DatabaseHelpers.DateReport
{
    public class ExpenseDateHelper : IExpenseDateHelper, IDisposable
    {
        private DatabaseContext _databaseContext;
        private bool _disposed = false;

        public ExpenseDateHelper(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        /// <summary>
        /// Get the last report from the database
        /// </summary>
        /// <param name="storeInformation"></param>
        /// <returns>Expense</returns>
        public Expense GetLastReport(StoreInformation storeInformation)
        {
            _databaseContext.StoreInformation.Attach(storeInformation);
            return _databaseContext.Expense.FirstOrDefault(x => x.Date == DateOnly.FromDateTime(DateTime.Now) && x.StoreInformation.Id == storeInformation.Id)
                ?? AddReport(new Expense() { Date = DateOnly.FromDateTime(DateTime.Now), StoreInformation=storeInformation });
        }

        /// <summary>
        /// Add report to the database
        /// </summary>
        /// <param name="expense"></param>
        /// <returns>Expense</returns>
        public Expense AddReport(Expense expense)
        {
            _databaseContext.Expense.Add(expense);
            _databaseContext.SaveChanges();
            return expense;
        }

        //Disposing
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing) 
        {
            if (!_disposed) 
            {
                if(disposing) { _databaseContext.Dispose(); }
                _disposed = true;
            }
        }
        ~ExpenseDateHelper()
        { Dispose(false); }
    }
}
