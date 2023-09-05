using Microsoft.AspNetCore.Mvc;
using Models.Model.Account.Information;
using Models.Model.Sale.Sales;

namespace SalesTracker.Controllers.Interfaces
{
    public interface ISaleController
    {
        IActionResult Add([FromBody] SaleModel[] sales);
        IActionResult GetCurrentDateSales();
        IActionResult GetCurrentDateSalesReport([FromBody] StoreInformation storeInformation);
    }
}