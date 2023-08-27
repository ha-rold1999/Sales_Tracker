using Microsoft.EntityFrameworkCore;
using Models.Model.Items;
using Models.Model.Sale.Sales;
using SalesTracker.EntityFramework;

namespace SalesTracker.DatabaseHelpers
{
    public class LogHelper : ILogHelper
    {
        private readonly DatabaseContext _databaseContext;

        public LogHelper(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public List<StockLog> GetStockLogs(int id)
        {
            return _databaseContext.StockLog.Where(x => x.ItemID.Id == id).ToList();
        }

        public List<BuyingPriceLog> GetBuyingPriceLogs(int id)
        {
            return _databaseContext.BuyingPriceLogs.Where(x => x.ItemID.Id == id).ToList();
        }

        public List<SellingPriceLog> GetSellingPriceLogs(int id)
        {
            return _databaseContext.SellingPriceLogs.Where(x => x.ItemID.Id == id).ToList();
        }

        public List<Sales> GetSaleReport(int id)
        {
            return _databaseContext.Sales.Include(x => x.Sale).Where(x => x.Item.Id == id).ToList();
        }
    }
}
