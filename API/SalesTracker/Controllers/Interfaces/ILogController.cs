using Microsoft.AspNetCore.Mvc;

namespace SalesTracker.Controllers.Interfaces
{
    public interface ILogController
    {
        IActionResult GetBuyingPriceLog(int id);
        IActionResult GetItemStockLog(int id);
        IActionResult GetSaleLog(int id);
        IActionResult GetSellingPriceLog(int id);
    }
}