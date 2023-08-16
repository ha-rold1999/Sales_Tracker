using Models.Model.Sale;
using Models.Model.Sale.Sales;

namespace SalesTracker.DatabaseHelpers.DateReport
{
    public interface IDateHelper<T>
    {
        Sale Add(T DTO);
        Sale Get(int id);
        List<Sale> GetAll();
        Sale GetLastReport();
        List<Sales> GetCurrentDateSales(int id);
    }
}