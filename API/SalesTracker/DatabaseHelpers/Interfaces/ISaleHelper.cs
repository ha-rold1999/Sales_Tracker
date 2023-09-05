using Models.Model.Sale.Sales;

namespace SalesTracker.DatabaseHelpers.Interfaces
{
    public interface ISaleHelper
    {
        Sales AddSales(SalesDTO DTO);
    }
}