﻿using AutoMapper;
using Models.Model.Items;
using SalesTracker.EntityFramework;

namespace SalesTracker.DatabaseHelpers
{
    public class ItemHelper : IDBHelper<ItemDTO, Item>
    {
        private readonly DatabaseContext _databaseContext;
        private readonly IMapper _mapper;

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
            _databaseContext.Item.Add(item);
            _databaseContext.SaveChanges();
            return item;
        }
        public Item Update(ItemDTO itemDTO)
        {
            var item = isExist(itemDTO.Id);
            _mapper.Map(itemDTO, item);

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

        private Item isExist(int id)
        {
            return _databaseContext.Item.Find(id) ?? throw new NullReferenceException();
        }
    }
}
