using AutoMapper;
using Models.Model.Expense.Expenses;
using Models.Model.Items;
using Models.Model.Sale;
using Models.Model.Sale.Reports;
using Models.Model.Sale.Sales;

namespace SalesTracker
{
    public class Automapper : Profile
    {
        public Automapper()
        {
            CreateMap<ItemDTO, Item>().ReverseMap();

            CreateMap<SaleDTO, Sale>().ReverseMap();
            CreateMap<SalesDTO, Sales>().ReverseMap();
            CreateMap<SaleReportDTO, SaleReport>().ReverseMap();
            CreateMap<ExpensesDTO, Expenses>().ReverseMap();
        }
    }
}
