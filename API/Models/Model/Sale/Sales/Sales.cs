
using Models.Model.Items;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.Sale.Sales
{
    [Table("sales")]
    public class Sales : ISales
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Column("sale_id")]
        public Sale Sale { get; set; }

        [Required]
        [Column("item_id")]
        public Item Item { get; set; }

        [Required]
        [Column("quantity")]
        public int Quantity { get; set; }

        [Required]
        [Column("profit")]
        [DataType("decimal")]
        public decimal Profit { get; set; }

        [Required]
        [Column("income")]
        [DataType("decimal")]
        public decimal Income { get; set; }
    }
}
