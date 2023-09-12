using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Model.Sale.Statistics
{
    public class DailyStoreSaleStatistics
    {
        public DateOnly Date { get; set; }
        public decimal Sale { get; set; }
    }
}
