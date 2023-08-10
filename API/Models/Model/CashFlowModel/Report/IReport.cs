using Models.Model.CashFlowModel.Flow;

namespace Models.Model.CashFlowModel.Report
{
    public interface IReport
    {
        DateOnly Date { get; set; }
        int Id { get; set; }
        CashFlow CashFlow { get; set; }
        decimal TotalExpense { get; set; }
        int TotalMoneyReturned { get; set; }
    }
}