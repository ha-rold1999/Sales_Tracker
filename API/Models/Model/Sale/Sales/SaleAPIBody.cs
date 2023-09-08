using Models.Model.Sale.Reports;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.Sale.Sales
{
    public class SaleAPIBody
    {
        public SaleModel[] sales { get; set; }
        public SaleReport sale { get; set; }
    }
}
