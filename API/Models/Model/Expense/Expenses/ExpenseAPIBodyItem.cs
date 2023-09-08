using Models.Model.Expense.Reports;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.Expense.Expenses
{
    public class ExpenseAPIBodyItem
    {
        public ExpensesDTO expense { get; set; }
        public ExpenseReport expenseReport { get; set; }
    }
}
