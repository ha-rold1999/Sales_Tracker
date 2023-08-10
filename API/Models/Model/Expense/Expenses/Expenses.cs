using Models.Model.Items;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.Expense.Expenses
{
    [Table("expenses")]
    public class Expenses : IExpenses
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [Column("expense_id")]
        public Expense Expense { get; set; }
        [Required]
        [Column("item_id")]
        public Item Item { get; set; }
        [Required]
        [Column("quantity")]
        public int Quantity { get; set; }
        [Required]
        [Column("cost")]
        [DataType("decimal")]
        public decimal Cost { get; set; }
    }
}
