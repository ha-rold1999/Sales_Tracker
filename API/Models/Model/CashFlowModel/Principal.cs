using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.CashFlowModel
{
    [Table("principal")]
    public class Principal : IPrincipal
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        [Column("capital")]
        [DataType("decimal")]
        public decimal Capital { get; set; } = 0.00m;
    }
}
