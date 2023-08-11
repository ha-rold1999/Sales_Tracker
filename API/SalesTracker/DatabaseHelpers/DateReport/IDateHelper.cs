using Models.Model.Sale;

namespace SalesTracker.DatabaseHelpers.DateReport
{
    public interface IDateHelper<T>
    {
        Sale Add(T DTO);
        Sale Get(int id);
        List<Sale> GetAll();
    }
}