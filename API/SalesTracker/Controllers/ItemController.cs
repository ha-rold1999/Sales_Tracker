using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Models.Model.Items;
using SalesTracker.DatabaseHelpers;
using System.ComponentModel.DataAnnotations;

namespace SalesTracker.Controllers
{
    public class ItemController : Controller, IController<Item>
    {
        private ItemHelper _database;
        private IMapper _mapper;

        public ItemController(ItemHelper database, IMapper mapper)
        {
            _database = database;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("api/[controller]/GetAll")]
        public IActionResult GetAll()
        {
            List<Item> items = _database.GetAll();
            return Ok(items);
        }

        [HttpPost]
        [Route("api/[controller]/Add")]
        public IActionResult Add([FromBody] Item item)
        {
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

        [HttpPut]
        [Route("api/[controller]/Update")]
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
            catch(Exception ex) 
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
