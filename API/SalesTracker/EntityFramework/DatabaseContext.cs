using Microsoft.EntityFrameworkCore;
using Models.Model.Account;
using Models.Model.Account.Credentials;
using Models.Model.Account.Information;
using Models.Model.Account.Status;
using Models.Model.CashFlowModel;
using Models.Model.CashFlowModel.Flow;
using Models.Model.CashFlowModel.Report;
using Models.Model.Expense;
using Models.Model.Expense.Expenses;
using Models.Model.Expense.Reports;
using Models.Model.Items;
using Models.Model.Sale;
using Models.Model.Sale.Reports;
using Models.Model.Sale.Sales;

namespace SalesTracker.EntityFramework
{
    public class DatabaseContext:DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Item>().Property(e => e.Id).ValueGeneratedOnAdd();
        }

        public DbSet<Item> Item { get; set; }
        public DbSet<Sale> Sale { get; set; }
        public DbSet<Sales> Sales { get; set; }
        public DbSet<SaleReport> SaleReport { get; set; }
        public DbSet<Expense> Expense { get; set; }
        public DbSet<Expenses> Expenses { get; set; }
        public DbSet<ExpenseReport> ExpensesReport { get; set; }
        public DbSet<Principal> Principal { get; set; }
        public DbSet<CashFlow> CashFlow { get; set; }
        public DbSet<CashFlowReport> CashFlowReport { get; set; }
        public DbSet<StockLog> StockLog { get; set; }
        public DbSet<BuyingPriceLog> BuyingPriceLogs { get; set; }
        public DbSet<SellingPriceLog> SellingPriceLogs { get; set; }
        public DbSet<StoreCredentials> StoreCredentials { get; set; }
        public DbSet<StoreInformation> StoreInformation { get; set; }
        public DbSet<AccountStatus> AccountStatus { get; set; }
        public DbSet<Token> Token { get; set; }
    }
}
