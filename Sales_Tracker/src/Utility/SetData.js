export function SetSales({
  selectedItem,
  setTootalProfit,
  totalProfit,
  setTotalIncome,
  totalIncome,
  quantity,
  setSales,
  sales,
  setSold,
  sold,
}) {
  console.log(JSON.parse(selectedItem));
  const profit = JSON.parse(selectedItem).sellingPrice * quantity;
  const income = profit - JSON.parse(selectedItem).buyingPrice * quantity;

  setTootalProfit(totalProfit + profit);
  setTotalIncome(totalIncome + income);

  const bought = { item: JSON.parse(selectedItem), quantity: quantity };
  const itemSold = {
    item: JSON.parse(selectedItem).itemName,
    quantity: quantity,
    profit: parseFloat(profit).toFixed(2),
    income: parseFloat(income).toFixed(2),
  };
  setSales([...sales, bought]);
  setSold([...sold, itemSold]);
}
