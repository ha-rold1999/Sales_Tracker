using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Models.Model.Items;
using SalesTracker.Configuration.Items;
using SalesTracker.Controllers.Interfaces;
using SalesTracker.DatabaseHelpers;
using SalesTracker.DatabaseHelpers.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace SalesTracker.Controllers
{
    public class ItemController : Controller, IItemController
    {
        private IItemHelper _itemHelper;
        private ItemsConfiguration _configuration;
        private ILogger<ItemController> _logger;

        //Running constructor
        public ItemController(IItemHelper itemHelper, IOptionsSnapshot<ItemsConfiguration> configuration, ILogger<ItemController> logger)
        {
            _itemHelper = itemHelper;
            _configuration = configuration.Value;
            _logger = logger;
        }

        //Get the items of the store
        [Authorize]
        [HttpGet]
        [Route("api/v{version}/[controller]/GetStoreItem/{id}")]
        [ApiVersion("1.0")]
        public IActionResult GetStoreItem(int id)
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

        //Get the deleted items of the store
        [Authorize]
        [HttpGet]
        [Route("api/v{version}/[controller]/GetStoreItemArchive/{id}")]
        [ApiVersion("1.0")]
        public IActionResult GetStoreItemArchive(int id)
        {
            try
            {
                List<Item> items = _itemHelper.GetArchiveItems(id);
                return Ok(items);
            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        //Retrieve the deleted item to make them available back to the store
        [Authorize]
        [HttpPut]
        [Route("api/v{version}/[controller]/RetriveItem")]
        [ApiVersion("1.0")]
        public IActionResult RetrieveItem([FromBody] ItemDTO item) 
        {
            try
            {
                var result =  _itemHelper.RetrieveItem(item);
                return Ok(result);
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

        //Add item to the store
        [Authorize]
        [HttpPost]
        [Route("api/v{version}/[controller]/AddItem")]
        [ApiVersion("1.0")]
        public IActionResult AddItem([FromBody] ItemDTO item)
        {
            if (_configuration.IsAddItemDisabled)
            {
                return StatusCode(500, "Adding new Item Under Construction");
            }
            try
            {
                var newItem = _itemHelper.AddItem(item);
                return Ok(newItem);
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

        //Update the item of the store
        [Authorize]
        [HttpPut]
        [Route("api/v{version}/[controller]/UpdateItem")]
        [ApiVersion("1.0")]
        public IActionResult UpdateItem([FromBody] ItemDTO item)
        {
            try
            {
                _itemHelper.UpdateItem(item);
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

        //Delete the item of the store
        [Authorize]
        [HttpDelete]
        [Route("api/v{version}/[controller]/DeleteItem/{id}")]
        [ApiVersion("1.0")]
        public IActionResult DeleteItem(int id)
        {
            try
            {
                _itemHelper.DeleteItem(id);
                return Ok();
            }
            catch (NullReferenceException)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError($"{ex.Message}");
                return BadRequest();
            }
        }
    }
}
