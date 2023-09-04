using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.Account.Credentials
{
    public class StoreCredentialsDTO : IStoreCredentials
    {
        public int Id { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
    }
}
