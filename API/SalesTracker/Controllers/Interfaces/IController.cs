﻿using Microsoft.AspNetCore.Mvc;
using Models.Model.Items;

namespace SalesTracker.Controllers.Interfaces
{
    public interface IController<T>
    {
        IActionResult Add([FromBody] T data);
        IActionResult GetAll();
        IActionResult Update([FromBody] T data);
    }
}