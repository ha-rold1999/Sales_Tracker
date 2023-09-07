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
  console.log("set Data");
  console.log(selectedItem.value);
  const profit = selectedItem.value.sellingPrice * quantity;
  const income = profit - selectedItem.value.buyingPrice * quantity;

  setTootalProfit(totalProfit + profit);
  setTotalIncome(totalIncome + income);

  const bought = { item: selectedItem.value, quantity: quantity };
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
  const expense = selectedItem.value.buyingPrice * quantity;

  setTotalExpense(totalExpense + expense);

  const bought = { item: selectedItem.value, quantity: quantity };
  setExpenses([...expenses, bought]);
}
