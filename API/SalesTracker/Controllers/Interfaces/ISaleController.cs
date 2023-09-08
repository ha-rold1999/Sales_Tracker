using Microsoft.AspNetCore.Mvc;
using Models.Model.Account.Information;
using Models.Model.Sale.Sales;

namespace SalesTracker.Controllers.Interfaces
{
    public interface ISaleController
    {
        IActionResult Add([FromBody] SaleBody saleBody);
        IActionResult GetCurrentDateSales();
        IActionResult GetCurrentDateSalesReport([FromBody] StoreInformation storeInformation);
    }
}