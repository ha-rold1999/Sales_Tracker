using Models.Model.Items;

namespace Models.Model.Expense.Expenses
{
    public interface IExpensesDTO
    {
        Item Item { get; set; }
        int Quantity { get; set; }
    }
}