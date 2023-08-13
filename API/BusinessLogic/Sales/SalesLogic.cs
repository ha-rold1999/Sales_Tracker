using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Sales
{
    public static class SalesLogic
    {
        public static decimal CalculateProfit(decimal sellingPrice, int quantity) => sellingPrice * quantity;

        public static decimal CalculateIncome(decimal buyingPrice, int  quantity, decimal profit) => profit - (buyingPrice*quantity);

        public static decimal CalculateTotalDailyReport(decimal currentReport, decimal additional) => currentReport + additional;
    }
}
