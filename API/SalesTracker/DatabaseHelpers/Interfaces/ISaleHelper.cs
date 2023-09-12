﻿using Models.Model.Account.Information;
using Models.Model.Sale.Sales;
using Models.Model.Sale.Statistics;

namespace SalesTracker.DatabaseHelpers.Interfaces
{
    public interface ISaleHelper
    {
        Sales AddSales(SalesDTO DTO);
        List<DailyStoreSaleStatistics> GetStoreProfitStatistics(int id);
        List<DailyStoreSaleStatistics> GetStoreIncomeStatistics(int id);
    }
}