using Microsoft.AspNetCore.Mvc;
using Models.Model.Items;

namespace SalesTracker.Controllers.Interfaces
{
    public interface IItemController
    {
        IActionResult AddItem([FromBody] ItemDTO item);
        IActionResult DeleteItem(int id);
        IActionResult GetStoreItem(int id);
        IActionResult GetStoreItemArchive(int id);
        IActionResult UpdateItem([FromBody] ItemDTO item);
        IActionResult RetrieveItem([FromBody] ItemDTO item);
    }
}