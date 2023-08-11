using AutoMapper;
using BusinessLogic.Sales;
using Microsoft.EntityFrameworkCore;
using Models.Model.Sale;
using Models.Model.Sale.Sales;
using SalesTracker.DatabaseHelpers.DateReport;
using SalesTracker.EntityFramework;

namespace SalesTracker.DatabaseHelpers
{
    public class SaleHelper : IDBHelper<SalesDTO, Sales>, IDisposable
    {
        private readonly DatabaseContext _context;
        private readonly IMapper _mapper;

        public SaleHelper(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public Sales Add(SalesDTO DTO)
        {
            DTO.Profit = SalesLogic.CalculateProfit(DTO.Item.SellingPrice, DTO.Quantity);
            DTO.Income = SalesLogic.CalculateIncome(DTO.Item.BuyingPrice, DTO.Quantity, DTO.Profit);

            var sales = _mapper.Map<Sales>(DTO);
            var item = sales.Item;
            _context.Attach(item);
            _context.Sales.Add(sales);
            _context.SaveChanges();
            
            return sales;
        }

        public Sales Delete(int id)
        {
            var sales = isExist(id);
            _context.Sales.Remove(sales);
            _context.SaveChanges();
            return sales;
        }

        public List<Sales> GetAll()
        {
            return _context.Sales.Include(s => s.Item).ToList();
        }

        public Sales Update(SalesDTO DTO)
        {
            var sales = isExist(DTO.Id);

            _mapper.Map(DTO, sales);
            _context.SaveChanges();
            return sales;
        }

        private Sales isExist(int id)
        {
            return _context.Sales.Find(id) ?? throw new NullReferenceException();
        }

        public void Dispose()
        {
            GC.Collect();
        }
    }
}
