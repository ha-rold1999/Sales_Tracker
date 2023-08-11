using Models.Model.Items;

namespace SalesTracker.DatabaseHelpers
{
    public interface IDBHelper<T, T_Entity>
    {
        T_Entity Add(T DTO);
        T_Entity Delete(int id);
        List<T_Entity> GetAll();
        T_Entity Update(T DTO);
    }
}