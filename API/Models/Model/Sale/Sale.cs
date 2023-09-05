using Models.Model.Account.Information;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.Sale
{
    [Table("sale")]
    public class Sale : ISale
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]

        public int Id { get; set; }
        [Column("date")]
        [Required]

        public DateOnly Date { get; set; }

        [Required]
        public StoreInformation StoreInformation { get; set; }
    }
}
