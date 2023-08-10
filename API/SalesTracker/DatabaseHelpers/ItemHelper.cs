using AutoMapper;
using Models.Model.Items;
using SalesTracker.EntityFramework;

namespace SalesTracker.DatabaseHelpers
{
    public class ItemHelper
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;

        public ItemHelper(DatabaseContext databaseContext, IMapper mapper)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }

        public List<Item> GetAllItems() 
        {
            return _databaseContext.Item.ToList();
        }

        public Item AddItem(ItemDTO itemDTO) 
        {
            var item = _mapper.Map<Item>(itemDTO);
            _databaseContext.Item.Add(item);
            _databaseContext.SaveChanges();
            return item;
        }
        public Item UpdateItem(ItemDTO itemDTO) 
        {
            isExist(itemDTO.Id);
            var item = _mapper.Map<Item>(itemDTO);

            _databaseContext.SaveChanges();
            return item;
        }

        public Item DeleteItem(int id) 
        {
            var item = isExist(id);
            _databaseContext.Item.Remove(item);
            _databaseContext.SaveChanges();
            return item;
        }

        private Item isExist(int id) 
        {
            return _databaseContext.Item.Find(id) ?? throw new NullReferenceException();
        }
    }
}
