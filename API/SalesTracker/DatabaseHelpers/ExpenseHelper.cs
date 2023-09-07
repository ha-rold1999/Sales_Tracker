using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Models.Model.Expense;
using Models.Model.Expense.Expenses;
using Models.Model.Expense.Reports;
using Models.Model.Items;
using SalesTracker.DatabaseHelpers.Interfaces;
using SalesTracker.EntityFramework;

namespace SalesTracker.DatabaseHelpers
{
    public class ExpenseHelper : IExpenseHelper, IDisposable
    {
        private DatabaseContext _databaseContext;
        private bool _disposed = false;

        public ExpenseHelper(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        /// <summary>
        /// Add expenses of each item in the database
        /// </summary>
        /// <param name="expenses"></param>
        /// <returns>Expenses</returns>
        public Expenses Add(Expenses expenses)
        {
            _databaseContext.StoreInformation.Attach(expenses.Expense.StoreInformation);
            _databaseContext.Expense.Attach(expenses.Expense);
            expenses.Cost = expenses.Quantity * expenses.Item.BuyingPrice;
            
            var item = expenses.Item;
            _databaseContext.Entry(item).State = EntityState.Modified;
            item.Stock += expenses.Quantity;

            LogStockUpdate(item);

            _databaseContext.Expenses.Add(expenses);
            return expenses;
        }

        /// <summary>
        /// Get the expense report of each item
        /// </summary>
        /// <param name="id"></param>
        /// <returns>List<Expenses></returns>
        public List<Expenses> GetItemExpense(int id)
        {
            return _databaseContext.Expenses.Where(o => o.Item.Id == id).Include(e => e.Expense).ToList();
        }

        //Add log to stock update to the database
        private void LogStockUpdate(Item item)
        {
            var entry = _databaseContext.Entry(item);
            var change = entry.Properties.FirstOrDefault(p => p.IsModified && p.Metadata.Name == "Stock")!;
            var stockLog = new StockLog
            {
                OldStock = (int)change.OriginalValue!,
                NewStock = (int)change.CurrentValue!,
                DateUpdate = DateOnly.FromDateTime(DateTime.UtcNow.Date),
                ItemID = item
            };
            _databaseContext.StockLog.Add(stockLog);
        }

        //Disposing
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if(!_disposed)
            {
                if(disposing) { _databaseContext.Dispose(); }
                _disposed = true;
            }
        }
        ~ExpenseHelper()
        { Dispose(false); }
    }
}
