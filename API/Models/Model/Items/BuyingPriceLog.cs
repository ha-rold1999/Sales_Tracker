using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.Items
{
    [Table("buying_price_log")]
    public class BuyingPriceLog
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [Column("old_price")]
        public decimal OldPrice { get; set; }
        [Required]
        [Column("new_price")]
        public decimal NewPrice { get; set; }
        [Required]
        [Column("date_update")]
        public DateOnly DateUpdate { get; set; }
        [Required]
        [Column("item_id")]
        public Item ItemID { get; set; }
    }
}
