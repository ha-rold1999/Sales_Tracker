using Models.Model.Account.Credentials;

namespace Models.Model.Account.Status
{
    public interface IAccountStatus
    {
        DateOnly DataDeleted { get; set; }
        DateOnly DateCreated { get; set; }
        int Id { get; set; }
        bool IsDeleted { get; set; }
        StoreCredentials StoreCredentials { get; set; }
    }
}