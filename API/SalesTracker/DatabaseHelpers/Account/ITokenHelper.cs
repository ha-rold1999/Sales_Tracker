namespace SalesTracker.DatabaseHelpers.Account
{
    public interface ITokenHelper
    {
        void AddToBlackList(string token);
        bool CheckTokenInBlackList(string token);
    }
}