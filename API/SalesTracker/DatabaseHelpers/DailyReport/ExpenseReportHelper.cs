using Models.Model.Expense;
using Models.Model.Expense.Expenses;
using Models.Model.Expense.Reports;
using SalesTracker.EntityFramework;

namespace SalesTracker.DatabaseHelpers.DailyReport
{
    public class ExpenseReportHelper : IExpenseReportHelper
    {
        private DatabaseContext _databaseContext;

        public ExpenseReportHelper(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public ExpenseReport AddExpense(ExpenseReport expenseReport)
        {
            var expense = expenseReport.Expense;
            _databaseContext.Attach(expense);
            _databaseContext.ExpensesReport.Add(expenseReport);
            _databaseContext.SaveChanges();
            return expenseReport;
        }
        public ExpenseReport GetLastReport(Expense expense)
        {
            return _databaseContext.ExpensesReport.FirstOrDefault(x => x.Expense.Date == DateOnly.FromDateTime(DateTime.Now))
                ?? AddExpense(new ExpenseReport() { Expense = expense, TotalExpense = 0 });
        }

        public ExpenseReport UpdateExpenseReport(Expenses expenses, ExpenseReport expenseReport)
        {
            expenseReport.TotalExpense += expenses.Cost;

            _databaseContext.SaveChanges();
            return expenseReport;
        }
    }
}
