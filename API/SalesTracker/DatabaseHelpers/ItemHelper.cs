using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Models.Model.Expense;
using Models.Model.Expense.Expenses;
using Models.Model.Items;
using SalesTracker.DatabaseHelpers.Account;
using SalesTracker.DatabaseHelpers.Interfaces;
using SalesTracker.EntityFramework;
using System.ComponentModel.DataAnnotations;

namespace SalesTracker.DatabaseHelpers
{
    public class ItemHelper : IDisposable, IItemHelper
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;
        private readonly IMemoryCache _cache;
        private bool _disposed = false;

        public ItemHelper(DatabaseContext databaseContext, IMapper mapper, IMemoryCache cache)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
            _cache = cache;
        }

        /// <summary>
        /// Get the items of the store
        /// </summary>
        /// <param name="id"></param>
        /// <returns>int</returns>
        public List<Item> GetItems(int id)
        {
            return _databaseContext.Item.Where(x => x.StoreInformation.Id == id && x.isDeleted == false).OrderBy(x=>x.ItemName).ToList();
        }

        /// <summary>
        /// Add Item to the store
        /// </summary>
        /// <param name="itemDTO"></param>
        /// <returns>Item</returns>
        public Item AddItem(ItemDTO itemDTO)
        {
            var item = _mapper.Map<Item>(itemDTO);
            _databaseContext.StoreInformation.Attach(item.StoreInformation);
            //_databaseContext.StoreCredentials.Attach(item.StoreInformation.StoreCredentials);

            isValid(item);
            
            _databaseContext.Item.Add(item);
            _databaseContext.SaveChanges();

            _databaseContext.Entry(item).GetDatabaseValues();

            return item;
        }

        /// <summary>
        /// Update the item of the store
        /// </summary>
        /// <param name="itemDTO"></param>
        /// <returns>Item</returns>
        public Item UpdateItem(ItemDTO itemDTO)
        {
            var item = isExist(itemDTO.Id);
            _mapper.Map(itemDTO, item);
            isValid(item);
            LogUpdate(item);

            _databaseContext.SaveChanges();
            return item;
        }

        /// <summary>
        /// Delete the item of the store
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Item</returns>
        public Item DeleteItem(int id)
        {
            var item = isExist(id);
            item.isDeleted = true;
            _databaseContext.SaveChanges();
            return item;
        }

        //Log any changes to the item
        private void LogUpdate(Item item)
        {
            var entry = _databaseContext.Entry(item);
            var changes = entry.Properties.Where(p => p.IsModified).ToList();

            foreach (var change in changes)
            {
                if (change.Metadata.Name == "Stock")
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
                else if (change.Metadata.Name == "BuyingPrice")
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
                else if (change.Metadata.Name == "SellingPrice")
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

        //Check if the item exist
        private Item isExist(int id)
        {
            return _databaseContext.Item.Find(id) ?? throw new NullReferenceException();
        }

        //Log the item to the expense report
        private void LogAdd(Item item)
        {
            var cachedExpense = GetCachedExpense();
            _databaseContext.Attach(cachedExpense);
            var expense = new Expenses { Expense = cachedExpense, Item = item, Cost = item.BuyingPrice * item.Stock, Quantity = item.Stock };
            _databaseContext.Expenses.Add(expense);
            _databaseContext.SaveChanges();
        }

        //Check if the item model is valid
        private void isValid(Item item)
        {
            var validationResult = new List<ValidationResult>();
            bool isValid = Validator.TryValidateObject(item, new ValidationContext(item), validationResult, validateAllProperties: true);

            if (item.SellingPrice <= item.BuyingPrice)
            { isValid = false; }

            if (!isValid) { throw new ValidationException(); }
        }

        private Expense? GetCachedExpense()
        {
            if (_cache.TryGetValue("CurrentDateExpense", out Expense expenseDate))
            {
                return expenseDate;
            }
            return null;
        }

        //Disposing the object
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
