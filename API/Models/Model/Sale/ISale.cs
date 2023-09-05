using Models.Model.Account.Information;

namespace Models.Model.Sale
{
    public interface ISale
    {
        DateOnly Date { get; set; }
        int Id { get; set; }
        StoreInformation StoreInformation { get; set; } 
    }
}