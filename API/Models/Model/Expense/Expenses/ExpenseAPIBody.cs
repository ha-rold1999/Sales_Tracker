using Models.Model.Expense.Reports;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.Expense.Expenses
{
    public class ExpenseAPIBody
    {
        public ExpensesDTO[] expenses { get; set; }
        public ExpenseReport expenseReport { get; set; }
    }
}
