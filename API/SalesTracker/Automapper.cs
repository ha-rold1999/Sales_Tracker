using AutoMapper;
using Models.Model.Account;
using Models.Model.Account.Credentials;
using Models.Model.Account.Information;
using Models.Model.Account.Status;
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
            CreateMap<StoreCredentialsDTO, StoreCredentials>().ReverseMap();
            CreateMap<StoreInformationDTO, StoreInformation>().ReverseMap();
            CreateMap<AccountStatusDTO, AccountStatus>().ReverseMap();
            CreateMap<CreateAccountDTO, StoreCredentials>().ReverseMap();
            CreateMap<CreateAccountDTO, StoreInformation>().ReverseMap();
        }
    }
}
