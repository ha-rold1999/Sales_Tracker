using AutoMapper;
using CustomException;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.Model.Items;
using Models.Model.Sale;
using Models.Model.Sale.Reports;
using Models.Model.Sale.Sales;
using SalesTracker.DatabaseHelpers;
using SalesTracker.DatabaseHelpers.DailyReport;
using SalesTracker.DatabaseHelpers.DateReport;

namespace SalesTracker.Controllers
{
    [ApiController]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class SaleController : Controller
    {
        private readonly SaleHelper _saleHelper;
        private readonly SaleDateHelper _saleDateHelper;
        private readonly SaleReportHelper _saleReportHelper;
        private readonly IMapper _mapper;
        private readonly Sale saleDate;
        private readonly SaleReport saleReport;

        public SaleController(SaleHelper saleHelper, SaleDateHelper saleDateHelper, SaleReportHelper saleReportHelper, IMapper mapper)
        {
            _saleHelper = saleHelper;
            _saleDateHelper = saleDateHelper;
            _saleReportHelper = saleReportHelper;
            _mapper = mapper;

            saleDate = _saleDateHelper.GetLastReport();
            saleReport = _saleReportHelper.GetLastReport(saleDate);
        }

        [HttpPost]
        [ApiVersion("1.0")]
        public IActionResult Add([FromBody] Sales sales) 
        {
            try
            {
                sales.Sale = saleDate;

                var salesDTO = _mapper.Map<SalesDTO>(sales);

                _saleHelper.Add(salesDTO);
                _saleReportHelper.UpdateSaleReport(saleReport, salesDTO);
                return Ok(sales);
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest($"Item does not exist {sales.Item}");
            }
            catch (SalesQuantityException)
            {
                return BadRequest("");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAllSales")]
        [ApiVersion("1.0")]
        public IActionResult GetAllSales()
        {
            List<Sales> sales = _saleHelper.GetAll();
            return Ok(sales);
        }

        [HttpGet("GetAllDailyReport")]
        [ApiVersion("1.0")]
        public IActionResult GetAllDailyReport()
        {
            List<SaleReport> saleReports = _saleReportHelper.GetAllReport();
            return Ok(saleReports);
        }

        [HttpGet("GetCurrentDateSales")]
        [ApiVersion("1.0")]
        public IActionResult GetCurrentDateSales()
        {
            List<Sales> sales = _saleHelper.GetCurrentDateSales(saleDate.Id);
            return Ok(sales);
        }
    }
}
