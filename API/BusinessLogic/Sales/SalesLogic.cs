using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Sales
{
    public static class SalesLogic
    {
        public static decimal CalculateProfit(decimal sellingPrice, int quantity)
        { return sellingPrice * quantity; }

        public static decimal CalculateIncome(decimal buyingPrice, int  quantity, decimal profit) 
        { return profit - (buyingPrice*quantity); }
    }
}
