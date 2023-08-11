using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.Items
{
    public interface IItem
    {
        public int Id { get; set; }
        public string ItemName { get; set; }
        public int Stock { get; set; }
        public decimal BuyingPrice { get; set; }
        public decimal SellingPrice { get; set; }
    }
}
