using Models.Model.Account.Credentials;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.Account.Information
{
    [Table("store_information")]
    public class StoreInformation : IStoreInformation
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int Id { get; set; }
        [Required]
        [StringLength(50)]
        [Column("store_name")]
        public string StoreName { get; set; }
        [Required]
        [Column("address")]
        public string StoreAddress { get; set; }
        [Required]
        [Column("phone_number")]
        public string PhoneNumber { get; set; }
        [Required]
        [StringLength(50)]
        [Column("first_name")]
        public string OwnerFirstname { get; set; }
        [Required]
        [StringLength(50)]
        [Column("last_name")]
        public string OwnerLastname { get; set; }
        [Required]
        public StoreCredentials StoreCredentials { get; set; }
    }
}
