using Models.Model.Items;

namespace Models.Model.Expense.Expenses
{
    public interface IExpenses
    {
        decimal Cost { get; set; }
        Expense Expense { get; set; }
        int Id { get; set; }
        Item Item { get; set; }
        int Quantity { get; set; }
    }
}