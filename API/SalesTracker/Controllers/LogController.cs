using Microsoft.AspNetCore.Mvc;
using Models.Model.Items;
using SalesTracker.DatabaseHelpers;

namespace SalesTracker.Controllers
{
    public class LogController : Controller
    {
        private LogHelper _log;

        public LogController(LogHelper log)
        {
            _log = log;
        }

        [HttpGet]
        [Route("/api/[controller]/item-stock-log/{id}")]
        public IActionResult GetItemStockLog(int id)
        {
            List<StockLog> stockLogs = _log.GetStockLogs(id);
            return Ok(stockLogs);
        }

        [HttpGet]
        [Route("/api/[controller]/item-buyingPrice-log/{id}")]
        public IActionResult GetBuyingPriceLog(int id)
        {
            List<BuyingPriceLog> stockLogs = _log.GetBuyingPriceLogs(id);
            return Ok(stockLogs);
        }

        [HttpGet]
        [Route("/api/[controller]/item-sellingPrice-log/{id}")]
        public IActionResult GetSellingPriceLog(int id)
        {
            List<SellingPriceLog> stockLogs = _log.GetSellingPriceLogs(id);
            return Ok(stockLogs);
        }
    }
}
