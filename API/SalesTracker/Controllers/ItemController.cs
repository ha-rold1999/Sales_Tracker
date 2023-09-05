using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Models.Model.Items;
using SalesTracker.Configuration.Items;
using SalesTracker.DatabaseHelpers;
using System.ComponentModel.DataAnnotations;

namespace SalesTracker.Controllers
{
    public class ItemController : Controller, IController<ItemDTO>
    {
        private ItemHelper _itemHelper;
        private IMapper _mapper;
        private ItemsConfiguration _configuration;
        private ILogger<ItemController> _logger;

        //Running constructor
        public ItemController(ItemHelper itemHelper, IMapper mapper, IOptionsSnapshot<ItemsConfiguration> configuration, ILogger<ItemController> logger)
        {
            _itemHelper = itemHelper;
            _mapper = mapper;
            _configuration = configuration.Value;
            _logger = logger;
        }

        [Authorize]
        [HttpGet]
        [Route("api/v{version}/[controller]/GetAll")]
        [ApiVersion("1.0")]
        public IActionResult GetAll()
        {
            try
            {
                List<Item> items = _itemHelper.GetAll();
                return Ok(items);
            }
            catch(Exception ex) 
            {
                _logger.LogError($"{ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpGet]
        [Route("api/v{version}/[controller]/GetStoreItem/{id}")]
        [ApiVersion("1.0")]
        public IActionResult GetAll(int id)
        {
            try
            {
                List<Item> items = _itemHelper.GetItems(id);
                return Ok(items);
            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPost]
        [Route("api/v{version}/[controller]/Add")]
        [ApiVersion("1.0")]
        public IActionResult Add([FromBody] ItemDTO item)
        {
            if(_configuration.IsAddItemDisabled)
            {
                return StatusCode(500, "Adding new Item Under Construction");
            }
            try
            {
                _itemHelper.Add(item);
                return Ok(item);
            }
            catch (ValidationException)
            {
                return BadRequest("Invalid Object");
            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [Authorize]
        [HttpPut]
        [Route("api/v{version}/[controller]/Update")]
        [ApiVersion("1.0")]
        public IActionResult Update([FromBody] ItemDTO item)
        {
            try
            {
                _itemHelper.Update(item);
                return Ok(item);
            }
            catch (ValidationException)
            {
                return BadRequest("Invalid item update");
            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message}");
                return BadRequest(ex.Message);
            }
        }
    }

}
