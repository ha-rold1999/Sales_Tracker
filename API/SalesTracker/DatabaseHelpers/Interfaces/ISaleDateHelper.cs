using Models.Model.Account.Information;
using Models.Model.Sale;
using Models.Model.Sale.Sales;

namespace SalesTracker.DatabaseHelpers.Interfaces
{
    public interface ISaleDateHelper
    {
        Sale AddSale(SaleDTO saleDTO);
        Sale GetLastReport(StoreInformation storeInformation);
    }
}