using Models.Model.Expense;
using Models.Model.Expense.Expenses;
using Models.Model.Expense.Reports;
using SalesTracker.DatabaseHelpers.Interfaces;
using SalesTracker.EntityFramework;

namespace SalesTracker.DatabaseHelpers.DailyReport
{
    public class ExpenseReportHelper : IExpenseReportHelper, IDisposable
    {
        private DatabaseContext _databaseContext;
        private bool _disposed = false;

        public ExpenseReportHelper(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        /// <summary>
        /// Add Expense report to the database
        /// </summary>
        /// <param name="expenseReport"></param>
        /// <returns>ExpenseReport</returns>
        public ExpenseReport AddExpense(ExpenseReport expenseReport)
        {
            var expense = expenseReport.Expense;
            _databaseContext.Attach(expense);
            _databaseContext.ExpensesReport.Add(expenseReport);
            _databaseContext.SaveChanges();
            return expenseReport;
        }

        /// <summary>
        /// Get the latest report from the database
        /// </summary>
        /// <param name="expense"></param>
        /// <returns>ExpenseReport</returns>
        public ExpenseReport GetLastReport(Expense expense)
        {
            return _databaseContext.ExpensesReport.FirstOrDefault(x => x.Expense.Date == DateOnly.FromDateTime(DateTime.Now) && x.Expense.Id == expense.Id)
                ?? AddExpense(new ExpenseReport() { Expense = expense, TotalExpense = 0 });
        }

        public SummaryExpense GetWeeklyReport(int id)
        {
            var currentDate = DateOnly.FromDateTime(DateTime.Now);
            var startDate = currentDate.AddDays(-(int)currentDate.DayOfWeek);
            var endDate = startDate.AddDays(6);

            return (from expense in _databaseContext.Expense
                    where expense.StoreInformation.Id == id && expense.Date >= startDate && expense.Date <= endDate
                    join report in _databaseContext.ExpensesReport on expense.Id equals report.Expense.Id
                    group new { report.TotalExpense } by 1 into reportGroup
                    select new SummaryExpense
                    {
                        totalExpense = reportGroup.Sum(x => x.TotalExpense)
                    }).Single();
        }
        public SummaryExpense GetMonthlyReport(int id)
        {
            var currentDate = DateOnly.FromDateTime(DateTime.Now);
            var startDate = new DateOnly(currentDate.Year, currentDate.Month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);

            return (from expense in _databaseContext.Expense
                    where expense.StoreInformation.Id == id && expense.Date >= startDate && expense.Date <= endDate
                    join report in _databaseContext.ExpensesReport on expense.Id equals report.Expense.Id
                    group new { report.TotalExpense } by 1 into reportGroup
                    select new SummaryExpense
                    {
                        totalExpense = reportGroup.Sum(x => x.TotalExpense)
                    }).Single();
        }

        public SummaryExpense GetTotalExpenseReport(int id)
        {
            return (from expense in _databaseContext.Expense
                    where expense.StoreInformation.Id == id
                    join report in _databaseContext.ExpensesReport on expense.Id equals report.Expense.Id
                    group new { report.TotalExpense } by 1 into reportGroup
                    select new SummaryExpense
                    {
                        totalExpense = reportGroup.Sum(x => x.TotalExpense)
                    }).Single();
        }

        /// <summary>
        /// Update the expense report
        /// </summary>
        /// <param name="expenses"></param>
        /// <param name="expenseReport"></param>
        /// <returns>ExpenseReport</returns>
        public ExpenseReport UpdateExpenseReport(Expenses expenses, ExpenseReport expenseReport)
        {
            _databaseContext.ExpensesReport.Attach(expenseReport);
            expenseReport.TotalExpense += expenses.Cost;

            _databaseContext.SaveChanges();
            return expenseReport;
        }

        //Disposing
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if(!_disposed)
            {
                if (disposing) { _databaseContext.Dispose(); }
                _disposed = true;
            }
        }
        ~ExpenseReportHelper() 
        { Dispose(false); }

    }
}
