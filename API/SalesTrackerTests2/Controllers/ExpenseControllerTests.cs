using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Models.Model.Expense.Expenses;
using SalesTracker.Controllers;
using SalesTracker.DatabaseHelpers;
using SalesTracker.DatabaseHelpers.DailyReport;
using SalesTracker.DatabaseHelpers.DateReport;
using SalesTracker.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SalesTrackerTests2.Controllers
{
    [TestClass()]
    internal class ExpenseControllerTests
    {
        private DatabaseContext _dbContext;
        private ILogger<ExpenseController> _logger;
        private ExpenseHelper _expenseHelper;
        private ExpenseDateHelper _expenseDateHelper;
        private ExpenseReportHelper _expenseReportHelper;
        private ExpenseController _controller;

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
            }).CreateMapper();
            _logger = LoggerFactory.Create(builder =>
            {
                builder.AddConsole();
            }).CreateLogger<ExpenseController>();

            _expenseHelper = new ExpenseHelper(_dbContext);
            _expenseDateHelper = new ExpenseDateHelper(_dbContext);
            _expenseReportHelper = new ExpenseReportHelper(_dbContext);

            _controller = new ExpenseController(_expenseHelper, _expenseDateHelper, _expenseReportHelper, _logger, config);
        }

        [TestMethod]
        public void GetCurrentDateExpenseReport_ShouldReturnOk()
        {
            var result = _controller.GetCurrentDateExpenseReport();
            Assert.IsInstanceOfType(result,typeof( OkObjectResult));
        }
    }
}
