using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.Expense.Reports
{
    [Table("expense_report")]
    public class ExpenseReport : IReport
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [Column("expnse_id")]
        public Expense Expense { get; set; }
        [Required]
        [Column("total_expense")]
        [DataType("decimal")]
        public decimal TotalExpense { get; set; }
    }
}
