using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Sales
{
    public static class InventoryLogic
    {
        public static int SubtractInventory(int currentInventory, int stockSubtracted) => currentInventory - stockSubtracted;
    }
}
