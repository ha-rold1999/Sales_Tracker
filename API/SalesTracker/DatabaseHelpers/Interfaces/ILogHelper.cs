using Models.Model.Items;
using Models.Model.Sale.Sales;

namespace SalesTracker.DatabaseHelpers.Interfaces
{
    public interface ILogHelper
    {
        List<BuyingPriceLog> GetBuyingPriceLogs(int id);
        List<Sales> GetSaleReport(int id);
        List<SellingPriceLog> GetSellingPriceLogs(int id);
        List<StockLog> GetStockLogs(int id);
    }
}