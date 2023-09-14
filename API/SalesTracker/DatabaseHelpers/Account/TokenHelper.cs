using Models.Model.Account;
using SalesTracker.EntityFramework;

namespace SalesTracker.DatabaseHelpers.Account
{
    public class TokenHelper : ITokenHelper, IDisposable
    {
        private DatabaseContext _context;
        private bool _disposed = false;

        public TokenHelper(DatabaseContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Add token to black list
        /// </summary>
        /// <param name="token"></param>
        public void AddToBlackList(string token)
        {
            _context.Token.Add(new Token { token = token });
            _context.SaveChanges();
        }

        /// <summary>
        /// Check if the token is already in the black list
        /// </summary>
        /// <param name="token"></param>
        /// <returns>bool</returns>
        public bool CheckTokenInBlackList(string token)
        {
            return _context.Token.FirstOrDefault(x => x.token == token) == null ? false : true;
        }

        //Disposing
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing) { _context.Dispose(); }
                _disposed = true;
            }
        }
        ~TokenHelper()
        { Dispose(false); }
    }
}
