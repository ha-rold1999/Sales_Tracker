using AutoMapper;
using BusinessLogic.Sales;
using Microsoft.EntityFrameworkCore;
using Models.Model.Sale;
using Models.Model.Sale.Reports;
using Models.Model.Sale.Sales;
using SalesTracker.DatabaseHelpers.Interfaces;
using SalesTracker.EntityFramework;

namespace SalesTracker.DatabaseHelpers.DailyReport
{
    public class SaleReportHelper : IDisposable, ISaleReportHelper
    {
        private readonly DatabaseContext _context;
        private readonly IMapper _mapper;
        private bool _disposed = false;

        public SaleReportHelper(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <summary>
        /// Add sale report to the database
        /// </summary>
        /// <param name="reportDTO"></param>
        /// <returns>SaleReport</returns>
        public SaleReport AddReport(SaleReportDTO reportDTO)
        {
            var saleReport = _mapper.Map<SaleReport>(reportDTO);
            var sale = saleReport.Sale;
            _context.Attach(sale);
            _context.SaleReport.Add(saleReport);
            _context.SaveChanges();
            return saleReport;
        }

        /// <summary>
        /// Get the latest sale report
        /// </summary>
        /// <param name="sale"></param>
        /// <returns>SaleReport</returns>
        public SaleReport GetLastReport(Sale sale)
        {
            return _context.SaleReport.FirstOrDefault(x => x.Sale.Date == DateOnly.FromDateTime(DateTime.Now) && x.Sale.Id == sale.Id)
                ?? AddReport(new SaleReportDTO() { Sale = sale, TotalIncome = 0, TotalProfit = 0 });
        }

        /// <summary>
        /// Update the report
        /// </summary>
        /// <param name="saleReport"></param>
        /// <param name="salesDTO"></param>
        /// <returns>SaleReport</returns>
        public SaleReport UpdateSaleReport(SaleReport saleReport, SalesDTO salesDTO)
        {
            _context.SaleReport.Attach(saleReport);
            saleReport.TotalIncome = SalesLogic.CalculateTotalDailyReport(saleReport.TotalIncome, salesDTO.Income);
            saleReport.TotalProfit = SalesLogic.CalculateTotalDailyReport(saleReport.TotalProfit, salesDTO.Profit);

            _context.SaveChanges();

            return saleReport;
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
        ~SaleReportHelper()
        { Dispose(false); }
    }
}
