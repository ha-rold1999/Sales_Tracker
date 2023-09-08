using Models.Model.Account.Credentials;

namespace Models.Model.Account.Information
{
    public interface IStoreInformation
    {
        int Id { get; set; }
        string OwnerFirstname { get; set; }
        string OwnerLastname { get; set; }
        string StoreAddress { get; set; }
        string PhoneNumber { get; set; }
        string StoreName { get; set; }
        StoreCredentials StoreCredentials { get; set; }
    }
}