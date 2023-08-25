using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.Items
{
    [Table("stock_log")]
    public class StockLog
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [Column("old_stock")]
        public int OldStock { get; set; }
        [Required]
        [Column("new_stock")]
        public int NewStock { get; set; }
        [Required]
        [Column("date_update")]
        public DateOnly DateUpdate { get; set; }
        [Required]
        [Column("item_id")]
        public Item ItemID { get; set; }
    }
}
