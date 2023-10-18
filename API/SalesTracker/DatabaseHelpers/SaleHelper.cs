using AutoMapper;
using BusinessLogic.Sales;
using CustomException;
using Microsoft.EntityFrameworkCore;
using Models.Model.Sale.Sales;
using Models.Model.Sale.Statistics;
using SalesTracker.DatabaseHelpers.Interfaces;
using SalesTracker.EntityFramework;

namespace SalesTracker.DatabaseHelpers
{
    public class SaleHelper : IDisposable, ISaleHelper
    {
        private readonly DatabaseContext _context;
        private readonly IMapper _mapper;
        private bool _disposed = false;

        public SaleHelper(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <summary>
        /// Add sales of each item to the database
        /// </summary>
        /// <param name="DTO"></param>
        /// <returns>Sales</returns>
        public Sales AddSales(SalesDTO DTO)
        {
            if (isValid(DTO))
            {
                DTO.Profit = SalesLogic.CalculateProfit(DTO.Item.SellingPrice, DTO.Quantity);
                DTO.Income = SalesLogic.CalculateIncome(DTO.Item.BuyingPrice, DTO.Quantity, DTO.Profit);
                DTO.Item.Stock = DTO.Item.Stock;
            }

            var sales = _mapper.Map<Sales>(DTO);
            var item = sales.Item;
            _context.StoreInformation.Attach(sales.Sale.StoreInformation);
            _context.Sale.Attach(sales.Sale);

            _context.Entry(item).State = EntityState.Modified;
            _context.Sales.Add(sales);

            return sales;
        }

        /// <summary>
        /// Get the daily profits of the store
        /// </summary>
        /// <param name="id"></param>
        /// <returns>List<DailyStoreSalesSatistics></returns>
        public List<DailyStoreSaleStatistics> GetStoreProfitStatistics(int id)
        {
            var Statistics = from sale in _context.Sale where sale.StoreInformation.Id == id
                             join report in _context.SaleReport on sale.Id equals report.Sale.Id
                             orderby sale.Date
                             select new DailyStoreSaleStatistics
                             {
                                 Date = sale.Date,
                                 Sale = report.TotalProfit
                             };
            return Statistics.ToList();
        }

        /// <summary>
        /// Get Store Total Profit
        /// </summary>
        /// <param name="id"></param>
        /// <returns>decimal</returns>
        public decimal GetStoreTotalProfit(int id)
        {
            var total = from sale in _context.Sale
                        where sale.StoreInformation.Id == id
                        join report in _context.SaleReport on sale.Id equals report.Sale.Id
                        select report.TotalProfit;
            return total.Sum();
        }

        /// <summary>
        /// Get store average profit
        /// </summary>
        /// <param name="id"></param>
        /// <returns>decimal</returns>
        public decimal GetStoreAverageProfit(int id)
        {
            var hasItems = _context.Sales.Any(sales => sales.Item.Id == id);

            if (hasItems)
            {
                var average = from sale in _context.Sale
                              where sale.StoreInformation.Id == id
                              join report in _context.SaleReport on sale.Id equals report.Sale.Id
                              select report.TotalProfit;
                return average.Average();
            }
            else
            {
                return 0;
            }
            
        }
        

        /// <summary>
        /// Get the daily income of the store
        /// </summary>
        /// <param name="id"></param>
        /// <returns>List<DailyStoreSaleStatistics></returns>
        public List<DailyStoreSaleStatistics> GetStoreIncomeStatistics(int id)
        {
            var Statistics = from sale in _context.Sale
                             where sale.StoreInformation.Id == id
                             join report in _context.SaleReport on sale.Id equals report.Sale.Id
                             orderby sale.Date
                             select new DailyStoreSaleStatistics
                             {
                                 Date = sale.Date,
                                 Sale = report.TotalIncome
                             };
            return Statistics.ToList();
        }

        /// <summary>
        /// Get Store Total Income
        /// </summary>
        /// <param name="id"></param>
        /// <returns>decimal</returns>
        public decimal GetStoreTotalIncome(int id)
        {
            var total = from sale in _context.Sale
                        where sale.StoreInformation.Id == id
                        join report in _context.SaleReport on sale.Id equals report.Sale.Id
                        select report.TotalIncome;
            return total.Sum();
        }

        /// <summary>
        /// Get Store Average Income
        /// </summary>
        /// <param name="id"></param>
        /// <returns>decimal</returns>
        public decimal GetStoreAverageIncome(int id)
        {
            var hasItems = _context.Sales.Any(sales => sales.Item.Id == id);

            if (hasItems)
            {
                var total = from sale in _context.Sale
                            where sale.StoreInformation.Id == id
                            join report in _context.SaleReport on sale.Id equals report.Sale.Id
                            select report.TotalIncome;
                return total.Average();
            }
            else
            {
                return 0;
            }

            
        }

        /// <summary>
        /// Get the item's total profit
        /// </summary>
        /// <param name="id"></param>
        /// <returns>List<ItemStatistics></returns>
        public List<ItemStatistics> GetItemTotalProfit(int id)
        {
            var Statistics = from sale in _context.Sale
                             where sale.StoreInformation.Id == id
                             join sales in _context.Sales on sale.Id equals sales.Sale.Id
                             group new { sales.Item, sales.Profit } by sales.Item.Id into groupSales
                             orderby groupSales.Sum(s => s.Profit) descending
                             select new ItemStatistics
                             {
                                 name = groupSales.First().Item.ItemName,
                                 total = groupSales.Sum(s => s.Profit)
                             };

            return Statistics.ToList();
        }

        /// <summary>
        /// Get the item's total sold
        /// </summary>
        /// <param name="id"></param>
        /// <returns>List<ItemStatistics></returns>
        public List<ItemStatistics> GetItemTotalSold(int id)
        {
            var Statistics = from sale in _context.Sale
                             where sale.StoreInformation.Id == id
                             join sales in _context.Sales on sale.Id equals sales.Sale.Id
                             group new { sales.Item, sales.Quantity } by sales.Item.Id into groupSales
                             orderby groupSales.Sum(s => s.Quantity) descending
                             select new ItemStatistics
                             {
                                 name = groupSales.First().Item.ItemName,
                                 total = groupSales.Sum(s => s.Quantity)
                             };

            return Statistics.ToList();
        }

        /// <summary>
        /// Get the item's daily profit
        /// </summary>
        /// <param name="storeId"></param>
        /// <param name="itemID"></param>
        /// <returns>List<DailyStoreSaleStatistics></returns>
        public List<DailyStoreSaleStatistics> GetItemReport(int storeId, int itemID)
        {
            var Statistics = from sale in _context.Sale
                             where sale.StoreInformation.Id == storeId
                             join report in _context.Sales on sale.Id equals report.Sale.Id
                             where report.Item.Id == itemID
                             group report by report.Sale.Id into groupedReport
                             select new DailyStoreSaleStatistics
                             {
                                 Date = groupedReport.First().Sale.Date,
                                 Sale = groupedReport.Sum(r => r.Profit)
                             };
            var sortedStatistics = Statistics.ToList().OrderBy(sale => sale.Date);
            return sortedStatistics.ToList();
        }

        /// <summary>
        /// Get the item's total sold
        /// </summary>
        /// <param name="id"></param>
        /// <returns>double</returns>
        public double GetStoreItemTotalSold(int id)
        {
            var total = from sales in _context.Sales
                        where sales.Item.Id == id
                        select sales.Quantity;
            return total.Sum();
        }

        /// <summary>
        /// Get the item's average sold
        /// </summary>
        /// <param name="id"></param>
        /// <returns>double</returns>
        public double GetStoreItemAverageSold(int id)
        {
            var hasItems = _context.Sales.Any(sales => sales.Item.Id == id);

            if (hasItems)
            {
                var total = _context.Sales
                    .Where(sales => sales.Item.Id == id)
                    .GroupBy(sales => sales.Sale.Id)
                    .Select(groupedSales => groupedSales.Sum(s => s.Quantity))
                    .Average();

                return total;
            }
            else
            {
                return 0;
            }
        }

        /// <summary>
        /// Get the item's total profit
        /// </summary>
        /// <param name="id"></param>
        /// <returns>decimal</returns>
        public decimal GetStoreItemTotalProfit(int id)
        {
            var total = from sales in _context.Sales
                        where sales.Item.Id == id
                        select sales.Profit;
            return total.Sum();
        }

        /// <summary>
        /// Get the item's total income
        /// </summary>
        /// <param name="id"></param>
        /// <returns>decimal</returns>
        public decimal GetStoreItemTotalIncome(int id)
        {
            var total = from sales in _context.Sales
                        where sales.Item.Id == id
                        select sales.Income;
            return total.Sum();
        }

        /// <summary>
        /// Get the item's average profit
        /// </summary>
        /// <param name="id"></param>
        /// <returns>decimal</returns>
        public decimal GetStoreItemAverageProfit(int id)
        {
            var hasItems = _context.Sales.Any(sales => sales.Item.Id == id);

            if (hasItems)
            {
                var total = _context.Sales
                    .Where(sales => sales.Item.Id == id)
                    .GroupBy(sales => sales.Sale.Id)
                    .Select(groupedSales => groupedSales.Sum(s => s.Profit))
                    .Average();

                return total;
            }
            else
            {
                return 0;
            }
        }   

        /// <summary>
        /// Get item's average income
        /// </summary>
        /// <param name="id"></param>
        /// <returns>decimal</returns>
        public decimal GetStoreItemAverageIncome(int id)
        {
            var hasItems = _context.Sales.Any(sales => sales.Item.Id == id);

            if (hasItems)
            {
                var total = _context.Sales
                    .Where(sales => sales.Item.Id == id)
                    .GroupBy(sales => sales.Sale.Id)
                    .Select(groupedSales => groupedSales.Sum(s => s.Income))
                    .Average();

                return total;
            }
            else
            {
                return 0;
            }
        }

        //Check if sales model is valid
        private bool isValid(SalesDTO dto)
        {
            bool isValid = dto.Quantity > 0;

            if (!isValid) { throw new SalesQuantityException(); }

            //isValid = dto.Item.Stock >= dto.Quantity;

            if (!isValid) { throw new SalesQuantityException(); }

            return isValid;
        }

        //Disposing
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing) { _context.Dispose(); }
                _disposed = true;
            }
        }
        ~SaleHelper()
        { Dispose(false); }
    }
}
