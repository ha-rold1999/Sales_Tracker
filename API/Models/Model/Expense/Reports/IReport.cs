namespace Models.Model.Expense.Reports
{
    internal interface IReport
    {
        Expense Expense { get; set; }
        int Id { get; set; }
        decimal TotalExpense { get; set; }
    }
}