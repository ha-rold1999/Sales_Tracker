using Microsoft.AspNetCore.Mvc;
using Models.Model.Sale.Sales;

namespace SalesTracker.Controllers
{
    public interface ISaleController<T>
    {
        IActionResult Add([FromBody] T[] sales);
        IActionResult GetAllDailyReport();
        IActionResult GetAllSales();
        IActionResult GetCurrentDateSales();
        IActionResult GetCurrentDateSalesReport();
    }
}