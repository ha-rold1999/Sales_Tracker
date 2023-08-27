using Microsoft.AspNetCore.Mvc;
using Models.Model.Items;
using Models.Model.Sale.Sales;
using SalesTracker.DatabaseHelpers;

namespace SalesTracker.Controllers
{
    public class LogController : Controller, ILogController
    {
        private ILogHelper _log;

        public LogController(ILogHelper log)
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
            List<BuyingPriceLog> sellingPriceLogs = _log.GetBuyingPriceLogs(id);
            return Ok(sellingPriceLogs);
        }

        [HttpGet]
        [Route("/api/[controller]/item-sellingPrice-log/{id}")]
        public IActionResult GetSellingPriceLog(int id)
        {
            List<SellingPriceLog> sellingPriceLogs = _log.GetSellingPriceLogs(id);
            return Ok(sellingPriceLogs);
        }

        [HttpGet]
        [Route("/api/[controller]/item-sales-log/{id}")]
        public IActionResult GetSaleLog(int id)
        {
            List<Sales> salesLogs = _log.GetSaleReport(id);
            return Ok(salesLogs);
        }
    }
}
