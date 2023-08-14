using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CustomException
{
    /// <summary>
    /// This will occur when the quantity of the sales will be 0 or greater than the stock of the item
    /// </summary>
    public class SalesQuantityException: Exception
    {
        private const string DEFAULT_MESSAGE = "Invalid sales quantity";

        public SalesQuantityException() : base(DEFAULT_MESSAGE)
        {
            
        }

        public SalesQuantityException(string message): base(message)
        {
             
        }

        public SalesQuantityException(Exception innerException):base(DEFAULT_MESSAGE, innerException)
        {
            
        }

        public SalesQuantityException(string message, Exception innerException):base(message, innerException)
        {
            
        }

    }
}
