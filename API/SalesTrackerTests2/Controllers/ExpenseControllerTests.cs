using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Models.Model.Expense.Expenses;
using Models.Model.Items;
using SalesTracker.Controllers;
using SalesTracker.DatabaseHelpers.DailyReport;
using SalesTracker.DatabaseHelpers.DateReport;
using SalesTracker.DatabaseHelpers;
using SalesTracker.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesTracker.Tests
{
    [TestClass()]
    public class ExpenseControllerTests
    {
        private DatabaseContext _dbContext;
        private ILogger<ExpenseController> _logger;
        private ExpenseHelper _expenseHelper;
        private ExpenseDateHelper _expenseDateHelper;
        private ExpenseReportHelper _expenseReportHelper;
        private ExpenseController _controller;
        private ItemHelper _itemHelper;

        [TestInitialize]
        public void SetUp()
        {
            var option = new DbContextOptionsBuilder<DatabaseContext>()
                .UseInMemoryDatabase(databaseName: "Expense Database")
                .Options;

            _dbContext = new DatabaseContext(option);
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<ExpensesDTO, Expenses>().ReverseMap();
                cfg.CreateMap<ItemDTO, Item>().ReverseMap();
            }).CreateMapper();

            _logger = LoggerFactory.Create(builder =>
            {
                builder.AddConsole();
            }).CreateLogger<ExpenseController>();

            _expenseHelper = new ExpenseHelper(_dbContext);
            _expenseDateHelper = new ExpenseDateHelper(_dbContext);
            _expenseReportHelper = new ExpenseReportHelper(_dbContext);

            _controller = new ExpenseController(_expenseHelper, _expenseDateHelper, _expenseReportHelper, _logger, config);


            //_itemHelper = new ItemHelper(new DatabaseContext(option), config);

        }

        [TestMethod]
        public void AddReport_ShouldReturnOk()
        {
            _itemHelper.Add(new ItemDTO { Id = 1, ItemName = "test", Stock = 1, BuyingPrice = 10, SellingPrice = 11 });
            ExpensesDTO[] expenses = {
                new ExpensesDTO { Item = new Item { Id = 1, ItemName = "test", Stock = 1, BuyingPrice = 10, SellingPrice = 11 }, Quantity = 1 }
            };

            var result = _controller.AddReport(expenses);
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public void AddReport_ShouldReturnBadRequest_ConcurrencyException()
        {
            ExpensesDTO[] expenses = {
                new ExpensesDTO { Item = new Item { Id = 2, ItemName = "test", Stock = 1, BuyingPrice = 10, SellingPrice = 11 }, Quantity = 1 }
            };

            var result = _controller.AddReport(expenses);
            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        [TestMethod]
        public void AddReport_ShouldReturnBadRequest_SalesQuantityException()
        {
            ExpensesDTO[] expenses = {
                new ExpensesDTO { Item = new Item { Id = 1, ItemName = "test", Stock = 1, BuyingPrice = 10, SellingPrice = 11 }, Quantity = 0 }
            };

            var result = _controller.AddReport(expenses);
            Assert.IsInstanceOfType(result, typeof(BadRequestResult));
        }

        [TestMethod]
        public void GetCurrentDateExpenseReport_ShouldReturnOk()
        {
            var result = _controller.GetCurrentDateExpenseReport();
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public void GetDailyExpenseReport_ShouldReturnOk()
        {
            var result = _controller.GetDailyExpenseReport();
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

        [TestMethod]
        public void GetItemExpenseReport_ShouldReturnOk()
        {
            var result = _controller.GetItemExpenseReport(1);
            Assert.IsInstanceOfType(result, typeof(OkObjectResult));
        }

    }
}