using Models.Model.Account;
using SalesTracker.EntityFramework;

namespace SalesTracker.DatabaseHelpers.Account
{
    public class TokenHelper
    {
        private DatabaseContext _context;

        public TokenHelper(DatabaseContext context)
        {
            _context = context;
        }
        public void AddToBlackList(string token)
        {
            _context.Token.Add(new Token { token = token });
            _context.SaveChanges();
        }

        public bool CheckTokenInBlackList(string token)
        {
            return _context.Token.FirstOrDefault(x => x.token == token) == null ? false : true;
        }
    }
}
