using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.Sale.Reports
{
    public class DateRangeReport
    {
        public DateOnly startDate { get; set; }
        public DateOnly endDate { get; set; } 
        public decimal TotalProfit { get; set; }
        public decimal TotalIncome { get; set; }
    }
}
