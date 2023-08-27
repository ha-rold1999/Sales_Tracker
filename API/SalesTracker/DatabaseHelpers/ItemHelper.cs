using AutoMapper;
using Models.Model.Items;
using SalesTracker.EntityFramework;
using System.ComponentModel.DataAnnotations;

namespace SalesTracker.DatabaseHelpers
{
    public class ItemHelper : IDBHelper<ItemDTO, Item>, IDisposable
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;
        private bool _disposed = false;

        public ItemHelper(DatabaseContext databaseContext, IMapper mapper)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }
        public List<Item> GetAll()
        {
            return _databaseContext.Item.ToList();
        }
        public Item Get(int id)
        {
            return _databaseContext.Item.Find(id) ?? throw new NullReferenceException();
        }
        public Item Add(ItemDTO itemDTO)
        {
            var item = _mapper.Map<Item>(itemDTO);
            isValid(item);

            _databaseContext.Item.Add(item);
            _databaseContext.SaveChanges();
            return item;
        }
        public Item Update(ItemDTO itemDTO)
        {
            var item = isExist(itemDTO.Id);
            _mapper.Map(itemDTO, item);
            isValid(item);
            LogUpdate(item);

            _databaseContext.SaveChanges();
            return item;
        }
        public Item Delete(int id)
        {
            var item = isExist(id);
            _databaseContext.Item.Remove(item);
            _databaseContext.SaveChanges();
            return item;
        }
        private void LogUpdate(Item item)
        {
            var entry = _databaseContext.Entry(item);
            var changes = entry.Properties.Where(p => p.IsModified).ToList();

            foreach(var change in changes)
            {
                if(change.Metadata.Name == "Stock")
                {
                    var stockLog = new StockLog
                    {
                        OldStock = (int)change.OriginalValue!,
                        NewStock = (int)change.CurrentValue!,
                        DateUpdate = DateOnly.FromDateTime(DateTime.UtcNow.Date),
                        ItemID = item
                    };
                    _databaseContext.StockLog.Add(stockLog);
                }
                else if(change.Metadata.Name == "BuyingPrice")
                {
                    var buyingPriceLog = new BuyingPriceLog
                    {
                        OldPrice = (decimal)change.OriginalValue!,
                        NewPrice = (decimal)change.CurrentValue!,
                        DateUpdate = DateOnly.FromDateTime(DateTime.UtcNow.Date),
                        ItemID = item
                    };
                    _databaseContext.BuyingPriceLogs.Add(buyingPriceLog);
                }
                else if( change.Metadata.Name == "SellingPrice")
                {
                    var sellingPricelog = new SellingPriceLog
                    {
                        OldPrice = (decimal)change.OriginalValue!,
                        NewPrice = (decimal)change.CurrentValue!,
                        DateUpdate = DateOnly.FromDateTime(DateTime.UtcNow.Date),
                        ItemID = item
                    };
                    _databaseContext.SellingPriceLogs.Add(sellingPricelog);
                }
            }
        }
        private Item isExist(int id)
        {
            return _databaseContext.Item.Find(id) ?? throw new NullReferenceException();
        }
        private void isValid(Item item)
        {
            var validationResult = new List<ValidationResult>();
            bool isValid = Validator.TryValidateObject(item, new ValidationContext(item), validationResult, validateAllProperties: true);

            if (item.SellingPrice <= item.BuyingPrice)
            { isValid = false; }

            if (!isValid) { throw new ValidationException(); }
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing) { _databaseContext.Dispose(); }
                _disposed = true;
            }
        }
        ~ItemHelper()
        { Dispose(false); }
    }
}
