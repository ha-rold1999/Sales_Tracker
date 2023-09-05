using Models.Model.Sale;
using Models.Model.Sale.Reports;
using Models.Model.Sale.Sales;

namespace SalesTracker.DatabaseHelpers.Interfaces
{
    public interface ISaleReportHelper
    {
        SaleReport AddReport(SaleReportDTO reportDTO);
        void Dispose();
        SaleReport GetLastReport(Sale sale);
        SaleReport UpdateSaleReport(SaleReport saleReport, SalesDTO salesDTO);
    }
}