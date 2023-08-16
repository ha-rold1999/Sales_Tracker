using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Models.Model.Items;
using Models.Model.Sale.Reports;
using Models.Model.Sale.Sales;
using Models.Model.Sale;
using SalesTracker.Controllers;
using SalesTracker.EntityFramework;
using SalesTracker.DatabaseHelpers;
using SalesTracker.DatabaseHelpers.DateReport;
using SalesTracker.DatabaseHelpers.DailyReport;
using Microsoft.AspNetCore.Mvc;
using SalesTracker.Configuration.Sales;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Moq;
using Microsoft.Extensions.Options;
using SalesTracker.Configuration.Items;

namespace SalesTracker.Tests
{
    [TestClass()]
    public class SalesControllerTests
    {
        private DatabaseContext _dbContext;
        private DatabaseContext _dbContextSale;
        private IDBHelper<ItemDTO, Item> _itemHelper;
        private IDBHelper<SalesDTO, Sales> _saleHelper;
        private IDateHelper<SaleDTO> _saleDateHelper;
        private ISaleReportHelper<SaleReportDTO, Sale, SaleReport, SalesDTO> _saleReportHelper;
        private ItemController _itemController;
        private SaleController _saleController;
        private Item? _item;

        [TestInitialize]
        public void Setup()
        {
            var option = new DbContextOptionsBuilder<DatabaseContext>()
                .UseInMemoryDatabase(databaseName: "Sales Database")
                .Options;

            _dbContext = new DatabaseContext(option);
            _dbContextSale = new DatabaseContext(option);

            var mapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<ItemDTO, Item>().ReverseMap();

                cfg.CreateMap<SaleDTO, Sale>().ReverseMap();
                cfg.CreateMap<SalesDTO, Sales>().ReverseMap();
                cfg.CreateMap<SaleReportDTO, SaleReport>().ReverseMap();
            }).CreateMapper();

            _itemHelper = new ItemHelper(_dbContext, mapper);
            _saleHelper = new SaleHelper(_dbContextSale, mapper);
            _saleDateHelper = new SaleDateHelper(_dbContextSale, mapper);
            _saleReportHelper = new SaleReportHelper(_dbContextSale, mapper);

            var optionsSnapshotMock = new Mock<IOptionsSnapshot<ItemsConfiguration>>();
            optionsSnapshotMock.Setup(s => s.Value)
                .Returns(new ItemsConfiguration { IsAddItemDisabled = false });

            _itemController = new ItemController(_itemHelper, mapper, optionsSnapshotMock.Object);
            var addItemResponse = _itemController.Add(new Item
            {
                Id = 1,
                ItemName = "item 1",
                Stock = 50,
                BuyingPrice = 9.00m,
                SellingPrice = 10.00m
            });

            var salesOptionsSnapshotMock = new Mock<IOptionsSnapshot<SalesConfiguration>>();
            salesOptionsSnapshotMock.Setup(s => s.Value)
                .Returns(new SalesConfiguration { IsAddSalesDisabled = false });
           

            _saleController = new SaleController(_saleHelper, _saleDateHelper, _saleReportHelper, mapper, salesOptionsSnapshotMock.Object);
        }

        [TestMethod]
        public void AddingSales_ShouldReturnOkObject_Add()
        {
            var result = _saleController.Add(new Sales
            {
                Id = 1,
                Item = new Item
                {
                    Id = 1,
                    ItemName = "item 1",
                    Stock = 50,
                    BuyingPrice = 9.00m,
                    SellingPrice = 10.00m
                },
                Quantity = 1
            });

            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public void AddingSales_ShouldReturnnadRequestObject_Add()
        {
            var result = _saleController.Add(new Sales
            {
                Id = 1,
                Item = new Item
                {
                    Id = 2,
                    ItemName = "item 1",
                    Stock = 50,
                    BuyingPrice = 9.00m,
                    SellingPrice = 10.00m
                },
                Quantity = 1
            });

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        [TestMethod]
        public void AddingSales_InvalidQuantity_Add()
        {
            var result = _saleController.Add(new Sales
            {
                Id = 1,
                Item = new Item
                {
                    Id = 1,
                    ItemName = "item 1",
                    Stock = 50,
                    BuyingPrice = 9.00m,
                    SellingPrice = 10.00m
                },
                Quantity = 0
            });

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }
        [TestMethod]
        public void AddingSales_QuantityGreaterThanStock_Add()
        {
            var result = _saleController.Add(new Sales
            {
                Id = 1,
                Item = new Item
                {
                    Id = 1,
                    ItemName = "item 1",
                    Stock = 50,
                    BuyingPrice = 9.00m,
                    SellingPrice = 10.00m
                },
                Quantity = 100
            });

            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
        }

        [TestMethod]
        public void GettingSales_GetAllSales()
        {
            var result = _saleController.GetAllSales();

            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public void GettingSales_GetAllDailyReport()
        {
            var result = _saleController.GetAllDailyReport();

            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public void GettingSales_GetAllCurrentDateSales()
        {
            var result = _saleController.GetCurrentDateSales();

            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }
    }
}