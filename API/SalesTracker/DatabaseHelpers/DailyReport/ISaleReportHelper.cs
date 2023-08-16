using Models.Model.Sale;
using Models.Model.Sale.Reports;
using Models.Model.Sale.Sales;

namespace SalesTracker.DatabaseHelpers.DailyReport
{
    public interface ISaleReportHelper<T_SalesReportDTO, T_Sale, T_SaleReport, T_SalesDTO>
    {
        SaleReport AddReport(T_SalesReportDTO reportDTO);
        List<SaleReport> GetAllReport();
        SaleReport GetLastReport(T_Sale sale);
        SaleReport GetReport(int id);
        SaleReport UpdateSaleReport(T_SaleReport saleReport, T_SalesDTO salesDTO);
    }
}