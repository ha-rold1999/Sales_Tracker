using Models.Model.Account;
using Models.Model.Account.Credentials;
using Models.Model.Account.Information;

namespace SalesTracker.DatabaseHelpers.Account
{
    public interface IAccountHelper
    {
        CreateAccountDTO CreateAccount(CreateAccountDTO createAccountDTO);
        void DeleteStore(int id);
        bool GetAccountStatus(int id);
        StoreCredentials? GetStoreCredentials(Login login);
        StoreInformation? GetStoreInfo(int id);
        void UpdatePassword(UpdatePassword updatePassword);
        StoreInformation UpdateStoreInformation(StoreInformationDTO storeInformation);
    }
}