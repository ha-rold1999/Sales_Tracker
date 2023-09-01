using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Models.Model.Expense.Expenses;
using Models.Model.Expense.Reports;
using Models.Model.Items;
using SalesTracker.EntityFramework;

namespace SalesTracker.DatabaseHelpers
{
    public class ExpenseHelper : IExpenseHelper
    {
        private DatabaseContext _databaseContext;

        public ExpenseHelper(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public Expenses Add(Expenses expenses)
        {
            expenses.Cost = expenses.Quantity * expenses.Item.BuyingPrice;

            var item = expenses.Item;
            _databaseContext.Entry(item).State = EntityState.Modified;
            item.Stock += expenses.Quantity;

            LogStockUpdate(item);

            _databaseContext.Expenses.Add(expenses);
            return expenses;
        }

        public List<Expenses> GetItemExpense(int id)
        {
            return _databaseContext.Expenses.Where(o => o.Item.Id == id).ToList();
        }
        public List<ExpenseReport> GetDailyExpense()
        {
            return _databaseContext.ExpensesReport.ToList();
        }
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
    }
}
