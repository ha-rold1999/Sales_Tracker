using Models.Model.Items;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.Sale.Sales
{
    public class SalesDTO : ISales
    {
        public int Id { get; set; }
        public decimal Income { get; set; }
        public Item Item { get; set; }
        public int Quantity { get; set; }
        public decimal Profit { get; set; }
        public Sale Sale { get; set; }
    }
}
