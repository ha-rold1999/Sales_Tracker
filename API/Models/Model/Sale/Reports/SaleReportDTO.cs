using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.Sale.Reports
{
    public class SaleReportDTO : IReport
    {
        public int Id { get; set; }
        public Sale Sale { get; set; }
        public decimal TotalIncome { get; set; }
        public decimal TotalProfit { get; set; }
    }
}
