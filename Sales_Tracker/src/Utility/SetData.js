export function SetSales({
  selectedItem,
  setTootalProfit,
  totalProfit,
  setTotalIncome,
  totalIncome,
  quantity,
  setSales,
  sales,
}) {
  console.log(JSON.parse(selectedItem));
  const profit = JSON.parse(selectedItem).sellingPrice * quantity;
  const income = profit - JSON.parse(selectedItem).buyingPrice * quantity;

  setTootalProfit(totalProfit + profit);
  setTotalIncome(totalIncome + income);

  const bought = { item: JSON.parse(selectedItem), quantity: quantity };
  setSales([...sales, bought]);
}

export function SetExpense({
  selectedItem,
  setTotalExpense,
  totalExpense,
  quantity,
  expenses,
  setExpenses,
}) {
  console.log(JSON.parse(selectedItem));
  const expense = JSON.parse(selectedItem).buyingPrice * quantity;

  setTotalExpense(totalExpense + expense);

  const bought = { item: JSON.parse(selectedItem), quantity: quantity };
  setExpenses([...expenses, bought]);
}
