using Models.Model.CashFlowModel.Flow;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.CashFlowModel.Report
{
    [Table("cash_flow_report")]
    public class CashFlowReport : IReport
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Column("cash_flow_od")]
        public CashFlow CashFlow { get; set; }

        [Required]
        [Column("total_expense")]
        [DataType("decimal")]
        public decimal TotalExpense { get; set; }

        [Required]
        [Column("tota_money_returned")]
        [DataType("decimal")]
        public int TotalMoneyReturned { get; set; }

        [Required]
        [Column("date")]
        public DateOnly Date { get; set; }

    }
}
