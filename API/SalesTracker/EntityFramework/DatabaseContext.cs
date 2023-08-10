using Microsoft.EntityFrameworkCore;
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
        DbSet<Item> Item { get; set; }
        DbSet<Sale> Sale { get; set; }
        DbSet<Sales> Sales { get; set; }
        DbSet<SaleReport> SaleReport { get; set; }
        DbSet<Expense> Expense { get; set; }
        DbSet<Expenses> Expenses { get; set; }
        DbSet<ExpenseReport> ExpensesReport { get; set; }
        DbSet<Principal> Principal { get; set; }
        DbSet<CashFlow> CashFlow { get; set; }
        DbSet<CashFlowReport> CashFlowReport { get; set; }
    }
}
