using Models.Model.Account.Credentials;
using Models.Model.Account.Information;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.Sale
{
    public class SaleDTO : ISale
    {
        public DateOnly Date { get; set; }
        public int Id { get; set; }
        public StoreInformation StoreInformation { get; set; }
    }
}
