using Microsoft.EntityFrameworkCore;
using Models.Model.Items;
using Models.Model.Sale.Sales;
using SalesTracker.DatabaseHelpers.Interfaces;
using SalesTracker.EntityFramework;

namespace SalesTracker.DatabaseHelpers
{
    public class LogHelper : ILogHelper, IDisposable
    {
        private readonly DatabaseContext _databaseContext;
        private bool _disposed = false;

        public LogHelper(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        /// <summary>
        /// Get the stock log of the item
        /// </summary>
        /// <param name="id"></param>
        /// <returns>List<StockLog></returns>
        public List<StockLog> GetStockLogs(int id)
        {
            return _databaseContext.StockLog.Where(x => x.ItemID.Id == id).ToList();
        }

        /// <summary>
        /// Get the buying price log of the item
        /// </summary>
        /// <param name="id"></param>
        /// <returns>List<BuyingPriceLog> </returns>
        public List<BuyingPriceLog> GetBuyingPriceLogs(int id)
        {
            return _databaseContext.BuyingPriceLogs.Where(x => x.ItemID.Id == id).ToList();
        }

        /// <summary>
        /// Get the selling price log of the item
        /// </summary>
        /// <param name="id"></param>
        /// <returns>List<SellingPriceLog></returns>
        public List<SellingPriceLog> GetSellingPriceLogs(int id)
        {
            return _databaseContext.SellingPriceLogs.Where(x => x.ItemID.Id == id).ToList();
        }

        /// <summary>
        /// Get the item sales log
        /// </summary>
        /// <param name="id"></param>
        /// <returns>List<Sales></returns>
        public List<Sales> GetSaleReport(int id)
        {
            return _databaseContext.Sales.Include(x => x.Sale).Where(x => x.Item.Id == id).ToList();
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
                if (disposing) { _databaseContext.Dispose(); }
                _disposed = true;
            }
        }
        ~LogHelper()
        { Dispose(false); }
    }
}
