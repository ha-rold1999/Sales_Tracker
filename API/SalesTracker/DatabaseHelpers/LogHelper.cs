using Models.Model.Items;
using SalesTracker.EntityFramework;

namespace SalesTracker.DatabaseHelpers
{
    public class LogHelper
    {
        private readonly DatabaseContext _databaseContext;

        public LogHelper(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
        }

        public List<StockLog> GetStockLogs(int id) 
        {
            return _databaseContext.StockLog.Where(x=> x.ItemID.Id == id).ToList();
        }
    }
}
