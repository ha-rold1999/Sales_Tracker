using AutoMapper;
using CustomException;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using Models.Model.Account.Information;
using Models.Model.Sale.Sales;
using SalesTracker.Configuration.Sales;
using SalesTracker.Controllers.Interfaces;
using SalesTracker.DatabaseHelpers.Interfaces;

namespace SalesTracker.Controllers
{
    public class SaleController : Controller, ISaleController
    {
        private readonly ISaleHelper _saleHelper;
        private readonly ISaleDateHelper _saleDateHelper;
        private readonly ISaleReportHelper _saleReportHelper;
        private readonly IMapper _mapper;
        private readonly SalesConfiguration _salesConfiguration;
        private readonly ILogger<SaleController> _logger;
        private readonly IMemoryCache _cache;

        //Running Constructor
        public SaleController(ISaleHelper saleHelper,
            ISaleDateHelper saleDateHelper,
            ISaleReportHelper saleReportHelper,
            IMapper mapper,
            IOptionsSnapshot<SalesConfiguration> configuration,
            ILogger<SaleController> logger,
            IMemoryCache cache)
        {
            _saleHelper = saleHelper;
            _saleDateHelper = saleDateHelper;
            _saleReportHelper = saleReportHelper;
            _mapper = mapper;

            _salesConfiguration = configuration.Value;

            _logger = logger;

            _cache = cache;
        }

        [Authorize]
        [HttpPost]
        [Route("api/[controller]/Add")]
        public IActionResult Add([FromBody] SaleAPIBody saleBody)
        {
            if (_salesConfiguration.IsAddSalesDisabled)
            { return StatusCode(500, "Adding new feature under construction"); }

            try
            {
                foreach (var sale in saleBody.sales)
                {
                    var salesDTO = _mapper.Map<SalesDTO>(sale);
                    salesDTO.Sale = saleBody.sale.Sale;

                    if (salesDTO.Sale == null)
                        throw new Exception("Sale Report Not Recorded");

                    _saleHelper.AddSales(salesDTO);
                    _saleReportHelper.UpdateSaleReport(saleBody.sale, salesDTO);
                }
                return Ok();

            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest($"Item does not exist");
            }
            catch (SalesQuantityException)
            {
                return BadRequest("");
            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPost]
        [Route("api/[controller]/GetCurrentDateSalesReport")]
        public IActionResult GetCurrentDateSalesReport([FromBody] StoreInformation storeInformation)
        {
            try
            {
                var saleDate = _saleDateHelper.GetLastReport(storeInformation);
                var saleReport = _saleReportHelper.GetLastReport(saleDate);
                _cache.Set("CurrenDateSales", saleDate, TimeSpan.FromMinutes(120));
                _cache.Set("SaleReport", saleReport, TimeSpan.FromMinutes(120));
                return Ok(saleReport);
            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("api/[controller]/GetStoreProfits/{id}")]
        public IActionResult GetStoreProfits(int id)
        {
           var statistics =  _saleHelper.GetStoreProfitStatistics(id);
            return Ok(statistics);
        }

        [Authorize]
        [HttpGet]
        [Route("api/[controller]/GetStoreIncome/{id}")]
        public IActionResult GetStoreIncome(int id)
        {
            var statistics = _saleHelper.GetStoreIncomeStatistics(id);
            return Ok(statistics);
        }

        [Authorize]
        [HttpGet]
        [Route("api/[controller]/GetItemsProfit/{id}")]
        public IActionResult GetItemsProfit(int id)
        {
            var statistics = _saleHelper.GetItemTotalProfit(id);
            return Ok(statistics);
        }

        [Authorize]
        [HttpGet]
        [Route("api/[controller]/GetItemSold/{id}")]
        public IActionResult GetItemSold(int id)
        {
            var statistics = _saleHelper.GetItemTotalSold(id);
            return Ok(statistics);
        }

        [Authorize]
        [HttpGet]
        [Route("api/[controller]/GetItemReport/{storeId}/{itemId}")]
        public IActionResult GetItemReport(int storeId, int itemId)
        {
            var statistics = _saleHelper.GetItemReport(storeId, itemId);
            return Ok(statistics);
        }

    }
}
