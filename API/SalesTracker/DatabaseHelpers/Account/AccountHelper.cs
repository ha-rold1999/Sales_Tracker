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
    public class AccountHelper : IAccountHelper, IDisposable
    {
        private DatabaseContext _databaseContext;
        private IMapper _mapper;
        private bool _disposed;

        public AccountHelper(DatabaseContext databaseContext, IMapper mapper)
        {
            _databaseContext = databaseContext;
            _mapper = mapper;
        }

        /// <summary>
        /// Create account
        /// </summary>
        /// <param name="createAccountDTO"></param>
        /// <returns>CreateAccountDTO </returns>
        /// <exception cref="SqlAlreadyFilledException"></exception>
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

        /// <summary>
        /// Get the store credentials
        /// </summary>
        /// <param name="login"></param>
        /// <returns>StoreCredentials</returns>
        public StoreCredentials? GetStoreCredentials(Login login)
        {
            var password = HashingPassword.HashPasswordFactory(login.Password);
            return _databaseContext.StoreCredentials.FirstOrDefault(x => x.Username == login.Username && x.Password == password);

        }

        /// <summary>
        /// Get the account status
        /// </summary>
        /// <param name="id"></param>
        /// <returns>bool</returns>
        public bool GetAccountStatus(int id)
        {
            return _databaseContext.AccountStatus.Any(x => x.StoreCredentials.Id == id && !x.IsDeleted);
        }

        /// <summary>
        /// Get store information
        /// </summary>
        /// <param name="id"></param>
        /// <returns>StoreInformation</returns>
        public StoreInformation? GetStoreInfo(int id)
        {
            return _databaseContext.StoreInformation
                .Where(x => x.StoreCredentials.Id == id).Select(x => new StoreInformation
                {
                    Id = x.Id,
                    StoreName = x.StoreName,
                    StoreAddress = x.StoreAddress,
                    OwnerFirstname = x.OwnerFirstname,
                    OwnerLastname = x.OwnerLastname,
                    PhoneNumber = x.PhoneNumber
                })
                .FirstOrDefault();
        }

        /// <summary>
        /// Update the store information
        /// </summary>
        /// <param name="storeInformation"></param>
        /// <returns>StoreInformation</returns>
        /// <exception cref="NullReferenceException"></exception>
        public StoreInformation UpdateStoreInformation(StoreInformationDTO storeInformation)
        {
            var getStoreInfo = IsStoreExist(storeInformation);
            if (getStoreInfo != null)
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

        /// <summary>
        /// Update the account password
        /// </summary>
        /// <param name="updatePassword"></param>
        public void UpdatePassword(UpdatePassword updatePassword)
        {
            var storeCredential = GetStoreCredentials(new Login { Username = updatePassword.Username, Password = updatePassword.Password });
            if (storeCredential != null)
            {
                var newPassword = HashingPassword.HashPasswordFactory(updatePassword.NewPassword);
                storeCredential.Password = newPassword;

                _databaseContext.SaveChanges();
            }
        }

        /// <summary>
        /// Delete the store account
        /// </summary>
        /// <param name="id"></param>
        /// <exception cref="NullReferenceException"></exception>
        public void DeleteStore(int id)
        {
            int? accountId = GetStoreCredentialId(id);
            if (accountId != null)
            {
                var storeStatus = GetAccountStatus(accountId);
                storeStatus.IsDeleted = true;
                storeStatus.DataDeleted = DateOnly.FromDateTime(DateTime.Now);
                _databaseContext.SaveChanges();
            }
            else
            {
                throw new NullReferenceException();
            }

        }

        //Check if user name is available
        private bool IsUsernamesAvailable(string username)
        {
            return _databaseContext.StoreCredentials.Any(x => x.Username == username);
        }

        //Check if the store already exist
        private StoreInformation? IsStoreExist(StoreInformationDTO storeInformation)
        {
            return _databaseContext.StoreInformation.Include(x => x.StoreCredentials).FirstOrDefault(x => x.Id == storeInformation.Id);
        }

        //Get the store credential id
        private int? GetStoreCredentialId(int Id)
        {
            return _databaseContext.StoreInformation.Include(x => x.StoreCredentials).First(x => x.Id == Id).StoreCredentials.Id;
        }

        //Get the account status
        private AccountStatus GetAccountStatus(int? id)
        {
            return _databaseContext.AccountStatus.Include(x => x.StoreCredentials).First(x => x.StoreCredentials.Id == id);
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
                if (disposing) { _databaseContext.Dispose(); }
                _disposed = true;
            }
        }
        ~AccountHelper()
        { Dispose(false); }
    }
}
