using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Models.Model.Items;
using SalesTracker.DatabaseHelpers;
using System.ComponentModel.DataAnnotations;

namespace SalesTracker.Controllers
{
    [ApiController]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class ItemController : Controller, IController<Item>
    {
        private ItemHelper _database;
        private IMapper _mapper;
        private IConfiguration _configuration;
        
        public ItemController(ItemHelper database, IMapper mapper, IConfiguration configuration)
        {
            _database = database;
            _mapper = mapper;
            _configuration = configuration.GetSection("ApiFeatures:ItemConfiguration");
        }

        [HttpGet("GetAll")]
        [ApiVersion("1.0")]
        public IActionResult GetAll()
        {
            List<Item> items = _database.GetAll();
            return Ok(items);
        }

        [HttpPost("Add")]
        [ApiVersion("1.0")]
        public IActionResult Add([FromBody] Item item)
        {
            if(_configuration.GetValue<bool>("IsAddItemDisabled"))
            {
                return StatusCode(500, "Adding new Item Under Construction");
            }

            try
            {
                var itemDTO = _mapper.Map<ItemDTO>(item);
                _database.Add(itemDTO);
                return Ok(item);
            }
            catch (ValidationException)
            {
                return BadRequest("Invalid Object");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Update")]
        [ApiVersion("1.0")]
        public IActionResult Update([FromBody] Item item)
        {
            try
            {
                var itemDTO = _mapper.Map<ItemDTO>(item);
                _database.Update(itemDTO);
                return Ok(item);
            }
            catch (ValidationException)
            {
                return BadRequest("Invalid item update");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

}
