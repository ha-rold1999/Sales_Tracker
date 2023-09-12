using AutoMapper;
using BusinessLogic.Sales;
using CustomException;
using Microsoft.EntityFrameworkCore;
using Models.Model.Account.Information;
using Models.Model.Sale;
using Models.Model.Sale.Sales;
using Models.Model.Sale.Statistics;
using SalesTracker.DatabaseHelpers.DateReport;
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
                DTO.Item.Stock = InventoryLogic.SubtractInventory(DTO.Item.Stock, DTO.Quantity);
            }

            var sales = _mapper.Map<Sales>(DTO);
            var item = sales.Item;
            _context.StoreInformation.Attach(sales.Sale.StoreInformation);
            _context.Sale.Attach(sales.Sale);

            _context.Entry(item).State = EntityState.Modified;
            _context.Sales.Add(sales);

            return sales;
        }

        public List<DailyStoreSaleStatistics> GetStoreProfitStatistics(int id)
        {
            var Statistics = from sale in _context.Sale where sale.StoreInformation.Id == id
                             join report in _context.SaleReport on sale.Id equals report.Sale.Id
                             select new DailyStoreSaleStatistics
                             {
                                 Date = sale.Date,
                                 Sale = report.TotalProfit
                             };
            return Statistics.ToList();
        }
        public List<DailyStoreSaleStatistics> GetStoreIncomeStatistics(int id)
        {
            var Statistics = from sale in _context.Sale
                             where sale.StoreInformation.Id == id
                             join report in _context.SaleReport on sale.Id equals report.Sale.Id
                             select new DailyStoreSaleStatistics
                             {
                                 Date = sale.Date,
                                 Sale = report.TotalIncome
                             };
            return Statistics.ToList();
        }

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

        public List<DailyStoreSaleStatistics> GetItemReport(int storeId, int itemID)
        {
            var Statistics = from sale in _context.Sale
                             where sale.StoreInformation.Id == storeId
                             join report in _context.Sales on sale.Id equals report.Sale.Id
                             where report.Item.Id == itemID
                             select new DailyStoreSaleStatistics
                             {
                                 Date = sale.Date,
                                 Sale = report.Profit
                             };
            return Statistics.ToList();
        }

        //Check if sales model is valid
        private bool isValid(SalesDTO dto)
        {
            bool isValid = dto.Quantity > 0;

            if (!isValid) { throw new SalesQuantityException(); }

            isValid = dto.Item.Stock >= dto.Quantity;

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
