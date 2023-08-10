using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.Sale.Reports
{
    [Table("sale_report")]
    public class SaleReport : IReport
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public Sale Sale { get; set; }
        [Required]
        [Column("total_profit")]
        [DataType("decimal")]
        public decimal TotalProfit { get; set; }
        [Required]
        [Column("total_income")]
        [DataType("decimal")]
        public decimal TotalIncome { get; set; }
    }
}
