using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Models.Model.Expense.Expenses;
using Models.Model.Items;
using SalesTracker.EntityFramework;

namespace SalesTracker.DatabaseHelpers
{
    public class ExpenseHelper
    {
        private DatabaseContext _databaseContext;
        private IMapper _mapper;
        private IDBHelper<ItemDTO, Item> _itemHepler;

        public ExpenseHelper(DatabaseContext databaseContext, IDBHelper<ItemDTO, Item> itemHelper, IMapper mapper)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
            _itemHepler = itemHelper;
        }

        public Expenses Add(Expenses expenses) 
        {
            expenses.Cost = expenses.Quantity * expenses.Item.BuyingPrice;

            var item = expenses.Item;
            _databaseContext.Entry(item).State = EntityState.Modified;
            item.Stock += expenses.Quantity;

            var itemDTO = _mapper.Map<ItemDTO>(item);
            _itemHepler.Update(itemDTO);

            _databaseContext.Expenses.Add(expenses);
            return expenses;
        }
    }
}
