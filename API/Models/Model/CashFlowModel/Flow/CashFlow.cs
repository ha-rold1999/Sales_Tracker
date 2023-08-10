using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.CashFlowModel.Flow
{
    [Table("cash_flow")]
    public class CashFlow : ICashFlow
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("principal_id")]
        public Principal Principal { get; set; }
        [Required]
        [Column("cash_on_hand")]
        [DataType("decimal")]
        public decimal CashOnHand { get; set; }
        [Required]
        [Column("cash_on_bank")]
        [DataType("decimal")]
        public decimal CashOnBank { get; set; }
        [Required]
        [Column("cash_on_investment")]
        [DataType("decimal")]
        public decimal CashOnInvestment { get; }
        [Required]
        [Column("date")]
        public DateOnly Date { get; set; }
    }
}
