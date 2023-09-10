using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Models.Model.Account;
using Models.Model.Account.Credentials;
using Models.Model.Account.Information;
using Models.Model.Account.Status;
using SalesTracker.EntityFramework;
using System.Data.SqlTypes;
using Utility;

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
            if (IsUsernamesAvailable(createAccountDTO.StoreCredentials.Username))
            {
                throw new SqlAlreadyFilledException();
            }

            var credential = new StoreCredentials 
            { 
                Password = HashingPassword.HashPasswordFactory(createAccountDTO.StoreCredentials.Password),
                Username = createAccountDTO.StoreCredentials.Username 
            };
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

        public StoreCredentials? GetStoreCredentials(Login login)
        {
            var password = HashingPassword.HashPasswordFactory(login.Password);
            return _databaseContext.StoreCredentials.FirstOrDefault(x => x.Username == login.Username && x.Password == password);

        }

        public StoreInformation? GetStoreInfo(int id)
        {
            return _databaseContext.StoreInformation
                .Where(x => x.StoreCredentials.Id == id).Select(x=> new StoreInformation { 
                    Id = x.Id, 
                    StoreName = x.StoreName,
                    StoreAddress = x.StoreAddress, 
                    OwnerFirstname = x.OwnerFirstname,
                    OwnerLastname = x.OwnerLastname,
                    PhoneNumber = x.PhoneNumber })
                .FirstOrDefault();
        }

        public StoreInformation UpdateStoreInformation(StoreInformationDTO storeInformation)
        {
            var getStoreInfo = IsStoreExist(storeInformation);
            if(getStoreInfo != null)
            {

               var result = _mapper.Map(storeInformation, getStoreInfo);
                _databaseContext.SaveChanges();
                return getStoreInfo;
            }
            else
            {
                throw new NullReferenceException();
            }

        }

        private bool IsUsernamesAvailable(string username)
        {
            return _databaseContext.StoreCredentials.Any(x => x.Username == username);
        }

        private StoreInformation? IsStoreExist(StoreInformationDTO storeInformation)
        {
            return _databaseContext.StoreInformation.Include(x=>x.StoreCredentials).FirstOrDefault(x => x.Id == storeInformation.Id);
        }

    }
}
