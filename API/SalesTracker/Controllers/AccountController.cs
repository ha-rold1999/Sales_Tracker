using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Models.Model.Account;
using Models.Model.Account.Information;
using SalesTracker.DatabaseHelpers.Account;
using System.Data.SqlTypes;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SalesTracker.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        private AccountHelper _accountHelper;
        private TokenHelper _tokenHelper;
        private ILogger<AccountController> _logger;
        private IConfiguration _configuration;

        public AccountController(AccountHelper accountHelper, TokenHelper tokenHelper,ILogger<AccountController> logger, IConfiguration configuration)
        {
            _accountHelper = accountHelper;
            _tokenHelper = tokenHelper;
            _logger = logger;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("CreateAccount")]
        public IActionResult CreateAccount([FromBody] CreateAccountDTO createAccount)
        {
            try
            {
                return Ok(_accountHelper.CreateAccount(createAccount).Id);
            }
            catch(SqlAlreadyFilledException)
            {
                return Conflict();
            }
            catch(Exception ex)
            {
                _logger.LogError($"{ex.Message}");
                return BadRequest();
            }
            
        }

        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] Login login)
        {
            var storeCredential = _accountHelper.GetStoreCredentials(login);
            if(storeCredential != null)
            {
                if(_accountHelper.GetAccountStatus(storeCredential.Id))
                {
                    var store = _accountHelper.GetStoreInfo(storeCredential.Id);
                    var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.PrimarySid, storeCredential.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                    var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
                    var token = new JwtSecurityToken(
                            issuer: _configuration["JWT:ValidIssuer"],
                            audience: _configuration["JWT:ValidAudience"],
                            expires: DateTime.Now.AddDays(1),
                            claims: authClaims,
                            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));
                    return Ok(
                        new
                        {
                            storeInformation = store,
                            token = new JwtSecurityTokenHandler().WriteToken(token),
                            expiration = DateTime.Now.AddHours(1)
                        });
                }
                return NotFound();
                
            }
            return Unauthorized();
        }

        [Authorize]
        [HttpPost]
        [Route("Logout")]
        public IActionResult Logout()
        {
            string header = Request.Headers["Authorization"].FirstOrDefault()!;
            _tokenHelper.AddToBlackList(header);
            return Ok();
        }

        [Authorize]
        [HttpPut]
        [Route("UpdateAccount")]
        public IActionResult UpdateAccount([FromBody] StoreInformationDTO storeInformationDTO)
        {
            try
            {
                var newStoreInformation = _accountHelper.UpdateStoreInformation(storeInformationDTO);
                return Ok(newStoreInformation);
            }
            catch(NullReferenceException)
            {
                return NotFound();
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest();
            }
        }

        [Authorize]
        [HttpDelete]
        [Route("DeleteAccount/{id}")]
        public IActionResult DeleteAccount(int id)
        {
            try
            {
                _accountHelper.DeleteStore(id);
                return Ok();
            }
            catch (NullReferenceException)
            {
                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return BadRequest();
            }
        }
    }
}
