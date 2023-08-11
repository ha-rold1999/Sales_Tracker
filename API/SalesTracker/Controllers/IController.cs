using Microsoft.AspNetCore.Mvc;
using Models.Model.Items;

namespace SalesTracker.Controllers
{
    public interface IController<T>
    {
        IActionResult Add([FromBody] T data);
        IActionResult Delete(int id);
        IActionResult GetAll();
        IActionResult Update([FromBody] T data);
    }
}