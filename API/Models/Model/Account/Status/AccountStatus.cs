using Models.Model.Account.Credentials;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.Account.Status
{
    [Table("account_status")]
    public class AccountStatus : IAccountStatus
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int Id { get; set; }
        [Required]
        [Column("date_created")]
        public DateOnly DateCreated { get; set; }
        [Required]
        [Column("is_deleted")]
        public bool IsDeleted { get; set; }
        [Required]
        [Column("date_deleted")]
        public DateOnly DataDeleted { get; set; }
        [Required]
        public StoreCredentials StoreCredentials { get; set; }
    }
}
