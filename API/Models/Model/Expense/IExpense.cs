namespace Models.Model.Expense
{
    public interface IExpense
    {
        DateOnly Date { get; set; }
        int Id { get; set; }
    }
}