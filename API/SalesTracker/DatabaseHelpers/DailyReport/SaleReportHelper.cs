using AutoMapper;
using Models.Model.Sale;
using Models.Model.Sale.Reports;
using SalesTracker.EntityFramework;

namespace SalesTracker.DatabaseHelpers.DailyReport
{
    public class SaleReportHelper
    {
        private readonly DatabaseContext _context;
        private readonly IMapper _mapper;

        public SaleReportHelper(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public SaleReport AddReport(SaleReportDTO reportDTO) 
        {
            var saleReport = _mapper.Map<SaleReport>(reportDTO);
            var sale = saleReport.Sale;
            _context.Attach(sale);
            _context.SaleReport.Add(saleReport);
            _context.SaveChanges();
            return saleReport; 
        }

        public List<SaleReport> GetAllReport() 
        {
            return _context.SaleReport.ToList();
        }

        public SaleReport GetReport(int id)
        {
            return _context.SaleReport.Find(id) ?? throw new NullReferenceException();
        }

        public SaleReport GetLastReport(Sale sale)
        {
            return _context.SaleReport.FirstOrDefault(x=> x.Sale.Date == DateTime.Today) ?? AddReport(new SaleReportDTO() { Sale = sale, TotalIncome = 0, TotalProfit=0 });
        }
    }
}
