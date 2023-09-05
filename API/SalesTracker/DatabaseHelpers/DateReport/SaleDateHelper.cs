using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Models.Model.Account.Information;
using Models.Model.Sale;
using Models.Model.Sale.Sales;
using SalesTracker.DatabaseHelpers.Interfaces;
using SalesTracker.EntityFramework;

namespace SalesTracker.DatabaseHelpers.DateReport
{
    public class SaleDateHelper : IDisposable, ISaleDateHelper
    {
        private readonly DatabaseContext _context;
        private readonly IMapper _mapper;
        private bool _disposed;

        public SaleDateHelper(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <summary>
        /// Add sale date to the database
        /// </summary>
        /// <param name="saleDTO"></param>
        /// <returns>Sale</returns>
        public Sale AddSale(SaleDTO saleDTO)
        {
            var sale = _mapper.Map<Sale>(saleDTO);
            _context.Sale.Add(sale);
            _context.SaveChanges();
            return sale;
        }

        /// <summary>
        /// Get the current date of the sale
        /// </summary>
        /// <param name="storeInformation"></param>
        /// <returns>Sale</returns>
        public Sale GetLastReport(StoreInformation storeInformation)
        {
            _context.StoreInformation.Attach(storeInformation);
            var todayReport = _context.Sale.FirstOrDefault(
                x => x.Date == DateOnly.FromDateTime(DateTime.Now) && x.StoreInformation.Id == storeInformation.Id)
                ?? AddSale(new SaleDTO()
                { Date = DateOnly.FromDateTime(DateTime.Now), StoreInformation = storeInformation });

            return todayReport;
        }

        /// <summary>
        /// Get the sales of each item on the current date
        /// </summary>
        /// <param name="id"></param>
        /// <returns>List of Sales</returns>
        public List<Sales> GetTodaysItemsSales(int id)
        {
            return _context.Sales.Where(sale => sale.Sale.Id == id).Include(sale => sale.Item).ToList();
        }

        //Disposable
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
        ~SaleDateHelper()
        { Dispose(false); }
    }
}
