﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Models.Model.Items;
using SalesTracker.Configuration.Items;
using SalesTracker.DatabaseHelpers;
using System.ComponentModel.DataAnnotations;

namespace SalesTracker.Controllers
{
    public class ItemController : Controller, IController<Item>
    {
        private IDBHelper<ItemDTO, Item> _database;
        private IMapper _mapper;
        private ItemsConfiguration _configuration;
        private ILogger<ItemController> _logger;

        //Running constructor
        public ItemController(IDBHelper<ItemDTO, Item> database, IMapper mapper, IOptionsSnapshot<ItemsConfiguration> configuration, ILogger<ItemController> logger)
        {
            _database = database;
            _mapper = mapper;
            _configuration = configuration.Value;
            _logger = logger;
        }

        [HttpGet]
        [Route("api/v{version}/[controller]/GetAll")]
        [ApiVersion("1.0")]
        public IActionResult GetAll()
        {
            try
            {
                List<Item> items = _database.GetAll();
                return Ok(items);
            }
            catch(Exception ex) 
            {
                _logger.LogError($"{ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("api/v{version}/[controller]/Add")]
        [ApiVersion("1.0")]
        public IActionResult Add([FromBody] Item item)
        {
            if(_configuration.IsAddItemDisabled)
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
                _logger.LogError($"{ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("api/v{version}/[controller]/Update")]
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
                _logger.LogError($"{ex.Message}");
                return BadRequest(ex.Message);
            }
        }
    }

}
