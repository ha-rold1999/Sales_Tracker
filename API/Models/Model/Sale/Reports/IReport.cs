namespace Models.Model.Sale.Reports
{
    public interface IReport
    {
        int Id { get; set; }
        Sale Sale { get; set; }
        decimal TotalIncome { get; set; }
        decimal TotalProfit { get; set; }
    }
}