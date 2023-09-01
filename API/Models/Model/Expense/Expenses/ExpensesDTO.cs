using Models.Model.Items;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.Expense.Expenses
{
    public class ExpensesDTO : IExpensesDTO
    {
        public Item Item { get; set; }
        public int Quantity { get; set; }
    }
}
