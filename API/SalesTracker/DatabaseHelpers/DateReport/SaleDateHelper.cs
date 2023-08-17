using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Models.Model.Sale;
using Models.Model.Sale.Sales;
using SalesTracker.EntityFramework;

namespace SalesTracker.DatabaseHelpers.DateReport
{
    public class SaleDateHelper : IDateHelper<SaleDTO>, IDisposable
    {
        private readonly DatabaseContext _context;
        private readonly IMapper _mapper;
        private bool _disposed = false;

        public SaleDateHelper(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public List<Sale> GetAll()
        {
            return _context.Sale.ToList();
        }
        public Sale Get(int id)
        {
            return _context.Sale.First(x => x.Id == id) ?? throw new NullReferenceException();
        }
        public Sale Add(SaleDTO saleDTO)
        {
            var sale = _mapper.Map<Sale>(saleDTO);
            _context.Sale.Add(sale);
            _context.SaveChanges();
            return sale;
        }
        public Sale GetLastReport()
        {
            
            var todayReport = _context.Sale.FirstOrDefault(x => x.Date == DateTime.Today)
                ?? Add(new SaleDTO() 
                { Date = DateTime.Today.ToUniversalTime() });

            return todayReport;
        }
        public List<Sales> GetCurrentDateSales(int id)
        {
            return _context.Sales.Where(sale => sale.Sale.Id == id).Include(sale => sale.Item).ToList();
        }
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if(!_disposed)
            {
                if(disposing) { _context.Dispose(); }
                _disposed = true; 
            }
        }
        ~SaleDateHelper()
        { Dispose(false); }
    }
}
