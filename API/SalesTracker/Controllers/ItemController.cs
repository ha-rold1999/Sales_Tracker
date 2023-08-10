using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Models.Model.Items;
using SalesTracker.DatabaseHelpers;

namespace SalesTracker.Controllers
{
    public class ItemController : Controller
    {
        private ItemHelper _database;
        private IMapper _mapper;

        public ItemController(ItemHelper database, IMapper mapper)
        {
            _database = database;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("api/[controller]/GetAllItem")]
        public IActionResult GetAllItem()
        {
            List<Item> items = _database.GetAllItems();
            return Ok(items);
        }

        [HttpPost]
        [Route("api/[controller]/AddItem")]
        public IActionResult AddItem([FromBody] Item item)
        {
            var itemDTO = _mapper.Map<ItemDTO>(item);
            _database.AddItem(itemDTO);
            return Ok(item);
        }

        [HttpPut]
        [Route("api/[controller]/UpdateItem")]
        public IActionResult UpdateItem([FromBody] Item item)
        {
            var itemDTO = _mapper.Map<ItemDTO>(item);
            _database.UpdateItem(itemDTO);
            return Ok(item);
        }

        [HttpDelete]
        [Route("api/[controller]/DeleteItem/{id}")]
        public IActionResult DeleteItem(int id) 
        {
            _database.DeleteItem(id);
            return Ok();
        }
    }
}
