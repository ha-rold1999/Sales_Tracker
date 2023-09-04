namespace Models.Model.Account.Credentials
{
    public interface IStoreCredentials
    {
        int Id { get; set; }
        string Password { get; set; }
        string Username { get; set; }
    }
}