using AutoMapper;
using Models.Model.Account;
using Models.Model.Account.Credentials;
using Models.Model.Account.Information;
using Models.Model.Account.Status;
using SalesTracker.EntityFramework;

namespace SalesTracker.DatabaseHelpers.Account
{
    public class AccountHelper
    {
        private DatabaseContext _databaseContext;
        private IMapper _mapper;

        public AccountHelper(DatabaseContext databaseContext, IMapper mapper)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }
        public CreateAccountDTO CreateAccount(CreateAccountDTO createAccountDTO)
        {
            var credential = new StoreCredentials { Password = createAccountDTO.StoreCredentials.Password, Username = createAccountDTO.StoreCredentials.Username };
            var information = _mapper.Map<StoreInformation>(createAccountDTO);
            information.StoreCredentials = credential;
            var status = new AccountStatus 
            { 
                DateCreated = DateOnly.FromDateTime(DateTime.Now),
                IsDeleted = false,
                StoreCredentials = credential
            };

            _databaseContext.StoreCredentials.Add(credential);
            _databaseContext.StoreInformation.Add(information);
            _databaseContext.AccountStatus.Add(status);
            _databaseContext.SaveChanges();

            createAccountDTO.Id = credential.Id;
            return createAccountDTO;
        }
        public StoreCredentials GetStoreCredentials(Login login)
        {
            return _databaseContext.StoreCredentials.FirstOrDefault(x => x.Username == login.Username && x.Password == login.Password);

        }

        public StoreInformation GetStoreInfo(int id)
        {
            return _databaseContext.StoreInformation.FirstOrDefault(x => x.StoreCredentials.Id == id);
        }


    }
}
