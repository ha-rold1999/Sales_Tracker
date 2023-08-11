using AutoMapper;
using Models.Model.Sale;
using SalesTracker.EntityFramework;

namespace SalesTracker.DatabaseHelpers.DateReport
{
    public class SaleDateHelper : IDateHelper<SaleDTO>, IDisposable
    {
        private readonly DatabaseContext _context;
        private readonly IMapper _mapper;

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

        public void Dispose()
        {
            GC.Collect();
        }
    }
}
