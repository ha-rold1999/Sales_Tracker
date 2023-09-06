using Models.Model.Account.Information;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Model.Expense
{
    [Table("expense")]
    public class Expense : IExpense
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [Column("date")]
        public DateOnly Date { get; set; }
        [Required]
        public StoreInformation StoreInformation { get; set; }  
       
    }
}
