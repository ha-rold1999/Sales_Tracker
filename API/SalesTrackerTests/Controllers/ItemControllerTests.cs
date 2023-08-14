﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Models.Model.Items;
using SalesTracker.Controllers;
using SalesTracker.DatabaseHelpers;
using SalesTracker.EntityFramework;

namespace SalesTracker.Tests
{
    [TestClass()]
    public class ItemControllerTests
    {
        private DatabaseContext _dbContext;
        private ItemHelper _itemHelper;
        private ItemController _itemController;

        [TestInitialize]
        public void Setup()
        {
            var option = new DbContextOptionsBuilder<DatabaseContext>()
                .UseInMemoryDatabase(databaseName: "Item Database")
                .Options;

            _dbContext = new DatabaseContext(option);

            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<ItemDTO, Item>().ReverseMap();
            }).CreateMapper();

            _itemHelper = new ItemHelper(_dbContext, config);
            _itemController = new ItemController(_itemHelper, config);
        }

        [TestMethod]
        public void ShouldReturnOK_GetAll()
        {
            var result = _itemController.GetAll();
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public void ShouldReturnOK_AddItem()
        {
            var result = _itemController.Add(new Item
            {
                Id = 1,
                ItemName = "item 1",
                Stock = 50,
                BuyingPrice = 9.00m,
                SellingPrice = 10.00m
            });

            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public void ShouldReturnBadRequest_AddItem()
        {
            var result = _itemController.Add(new Item
            {
                Id = 2,
                ItemName = "item 1",
            });

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        [TestMethod]
        public void ShouldReturnBadRequest_InvalidStock_AddItem()
        {
            var result = _itemController.Add(new Item
            {
                Id = 1,
                ItemName = "item 1",
                Stock = 0,
                BuyingPrice = 9.00m,
                SellingPrice = 10.00m
            });

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        [TestMethod]
        public void ShouldReturnBadRequest_InvalidBuyingPrice_AddItem()
        {
            var result = _itemController.Add(new Item
            {
                Id = 1,
                ItemName = "item 1",
                Stock = 50,
                BuyingPrice = 0,
                SellingPrice = 10.00m
            });

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        [TestMethod]
        public void ShouldReturnBadRequest_InvalidSellingPrice_AddItem()
        {
            var result = _itemController.Add(new Item
            {
                Id = 1,
                ItemName = "item 1",
                Stock = 0,
                BuyingPrice = 9.00m,
                SellingPrice = 10.00m
            });

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        [TestMethod]
        public void ShouldReturnBadRequest_SellingPriceLowerThanBuyingPrice_AddItem()
        {
            var result = _itemController.Add(new Item
            {
                Id = 1,
                ItemName = "item 1",
                Stock = 0,
                BuyingPrice = 9.00m,
                SellingPrice = 8.00m
            });

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }
    }
}