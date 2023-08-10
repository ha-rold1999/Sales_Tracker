using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.Items
{
    [Table("item")]
    public class Item : IItem
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set ; }
        [Column("item_name")]
        [Required]
        public string ItemName { get; set; }
        [Column("buying_price")]
        [Required]
        [DataType("decimal")]
        public decimal BuyingPrice { get; set; }
        [Column("selling_price")]
        [Required]
        [DataType("decimal")]
        public decimal SellingPrice { get; set; }
    }
}
