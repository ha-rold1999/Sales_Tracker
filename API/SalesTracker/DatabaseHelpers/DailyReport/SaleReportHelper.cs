using AutoMapper;
using BusinessLogic.Sales;
using Microsoft.EntityFrameworkCore;
using Models.Model.Sale;
using Models.Model.Sale.Reports;
using Models.Model.Sale.Sales;
using SalesTracker.EntityFramework;

namespace SalesTracker.DatabaseHelpers.DailyReport
{
    public class SaleReportHelper : ISaleReportHelper<SaleReportDTO, Sale, SaleReport, SalesDTO>, IDisposable
    {
        private readonly DatabaseContext _context;
        private readonly IMapper _mapper;
        private bool _disposed = false;

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
            return _context.SaleReport.Include(s => s.Sale).ToList();
        }
        public SaleReport GetReport(int id)
        {
            return _context.SaleReport.Find(id) ?? throw new NullReferenceException();
        }
        public SaleReport GetLastReport(Sale sale)
        {
            return _context.SaleReport.FirstOrDefault(x => x.Sale.Date == DateTime.Today) ?? AddReport(new SaleReportDTO() { Sale = sale, TotalIncome = 0, TotalProfit = 0 });
        }
        public SaleReport UpdateSaleReport(SaleReport saleReport, SalesDTO salesDTO)
        {
            saleReport.TotalIncome = SalesLogic.CalculateTotalDailyReport(saleReport.TotalIncome, salesDTO.Income);
            saleReport.TotalProfit = SalesLogic.CalculateTotalDailyReport(saleReport.TotalProfit, salesDTO.Profit);

            _context.SaveChanges();

            return saleReport;
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
                if (disposing){ _context.Dispose(); }
                _disposed = true;
            }
        }
        ~SaleReportHelper()
        { Dispose(false); }
    }
}
