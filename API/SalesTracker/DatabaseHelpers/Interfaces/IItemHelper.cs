using Models.Model.Items;

namespace SalesTracker.DatabaseHelpers.Interfaces
{
    public interface IItemHelper
    {
        Item AddItem(ItemDTO itemDTO);
        Item DeleteItem(int id);
        void Dispose();
        List<Item> GetItems(int id);
        Item UpdateItem(ItemDTO itemDTO);
    }
}