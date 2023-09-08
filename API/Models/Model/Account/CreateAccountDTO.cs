using Models.Model.Account.Credentials;
using Models.Model.Account.Information;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.Account
{
    public class CreateAccountDTO : IStoreInformation
    {
        public int Id { get; set; }
        public string OwnerFirstname { get; set; }
        public string OwnerLastname { get; set; }
        public string StoreAddress { get; set; }
        public string PhoneNumber { get; set; }
        public string StoreName { get; set; }
        public StoreCredentials StoreCredentials { get; set; }
    }
}
