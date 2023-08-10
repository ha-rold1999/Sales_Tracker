using Models.Model.Items;

namespace Models.Model.Sale.Sales
{
    public interface ISales
    {
        int Id { get; set; }
        decimal Income { get; set; }
        Item Item { get; set; }
        decimal Profit { get; set; }
        Sale Sale { get; set; }
    }
}