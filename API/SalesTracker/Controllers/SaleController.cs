﻿using AutoMapper;
using CustomException;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Models.Model.Items;
using Models.Model.Sale;
using Models.Model.Sale.Reports;
using Models.Model.Sale.Sales;
using SalesTracker.Configuration.Sales;
using SalesTracker.DatabaseHelpers;
using SalesTracker.DatabaseHelpers.DailyReport;
using SalesTracker.DatabaseHelpers.DateReport;

namespace SalesTracker.Controllers
{
    public class SaleController : Controller, ISaleController<Sales>
    {
        private readonly IDBHelper<SalesDTO, Sales> _saleHelper;
        private readonly IDateHelper<SaleDTO> _saleDateHelper;
        private readonly ISaleReportHelper<SaleReportDTO, Sale, SaleReport, SalesDTO> _saleReportHelper;
        private readonly IMapper _mapper;
        private readonly Sale saleDate;
        private readonly SaleReport saleReport;
        private readonly SalesConfiguration _salesConfiguration;

        //Running Constructor
        public SaleController(IDBHelper<SalesDTO,Sales> saleHelper,
            IDateHelper<SaleDTO> saleDateHelper,
            ISaleReportHelper<SaleReportDTO, Sale, SaleReport, SalesDTO> saleReportHelper,
            IMapper mapper, 
            IOptionsSnapshot<SalesConfiguration> configuration)
        {
            _saleHelper = saleHelper;
            _saleDateHelper = saleDateHelper;
            _saleReportHelper = saleReportHelper;
            _mapper = mapper;

            saleDate = _saleDateHelper.GetLastReport();
            saleReport = _saleReportHelper.GetLastReport(saleDate);

            _salesConfiguration = configuration.Value;
        }


        [HttpPost]
        [Route("api/[controller]/Add")]
        public IActionResult Add([FromBody] Sales sales)
        {
            if (_salesConfiguration.IsAddSalesDisabled)
            { return StatusCode(500, "Adding new feature under construction"); }

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

        [HttpGet]
        [Route("api/[controller]/GetAllSales")]
        public IActionResult GetAllSales()
        {
            List<Sales> sales = _saleHelper.GetAll();
            return Ok(sales);
        }

        [HttpGet]
        [Route("api/[controller]/GetAllDailyReport")]
        public IActionResult GetAllDailyReport()
        {
            List<SaleReport> saleReports = _saleReportHelper.GetAllReport();
            return Ok(saleReports);
        }

        [HttpGet]
        [Route("api/[controller]/GetCurrentDateSales")]
        public IActionResult GetCurrentDateSales()
        {
            List<Sales> sales = _saleDateHelper.GetCurrentDateSales(saleDate.Id);
            return Ok(sales);
        }

        [HttpGet]
        [Route("api/[controller]/GetCurrentDateSalesReport")]
        public IActionResult GetCurrentDateSalesReport()
        {
            return Ok(saleReport);
        }
    }
}
