using Microsoft.AspNetCore.Mvc;
using Models.Model.Account;
using Models.Model.Account.Information;

namespace SalesTracker.Controllers
{
    public interface IAccountController
    {
        IActionResult CreateAccount([FromBody] CreateAccountDTO createAccount);
        IActionResult DeleteAccount(int id);
        IActionResult Login([FromBody] Login login);
        IActionResult Logout();
        IActionResult UpdateAccount([FromBody] StoreInformationDTO storeInformationDTO);
        IActionResult UpdatePassword([FromBody] UpdatePassword updatePassword);
    }
}