namespace Models.Model.CashFlowModel.Flow
{
    public interface ICashFlow
    {
        decimal CashOnBank { get; set; }
        decimal CashOnHand { get; set; }
        decimal CashOnInvestment { get; }
        int Id { get; set; }
        Principal Principal { get; set; }
        DateOnly Date { get; set; }
    }
}