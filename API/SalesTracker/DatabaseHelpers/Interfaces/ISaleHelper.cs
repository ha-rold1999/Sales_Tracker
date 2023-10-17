using Models.Model.Account.Information;
using Models.Model.Sale.Sales;
using Models.Model.Sale.Statistics;

namespace SalesTracker.DatabaseHelpers.Interfaces
{
    public interface ISaleHelper
    {
        Sales AddSales(SalesDTO DTO);
        List<DailyStoreSaleStatistics> GetStoreProfitStatistics(int id);
        List<DailyStoreSaleStatistics> GetStoreIncomeStatistics(int id);
        decimal GetStoreTotalProfit(int id);
        decimal GetStoreAverageProfit(int id);
        List<ItemStatistics> GetItemTotalProfit(int id);
        List<ItemStatistics> GetItemTotalSold(int id);
        List<DailyStoreSaleStatistics> GetItemReport(int storeId, int itemID);
    }
}