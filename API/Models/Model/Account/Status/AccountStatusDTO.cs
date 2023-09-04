using Models.Model.Account.Credentials;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.Account.Status
{
    public class AccountStatusDTO : IAccountStatus
    {
        public DateOnly DataDeleted { get; set; }
        public DateOnly DateCreated { get; set; }
        public int Id { get; set; }
        public bool IsDeleted { get; set; }
        public StoreCredentials StoreCredentials { get; set; }
    }
}
