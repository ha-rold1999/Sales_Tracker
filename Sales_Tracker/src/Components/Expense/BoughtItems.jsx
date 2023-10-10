import React from "react";
import deleteButton from "./../../assets/delete-button.png";

export default function BoughtItems({
  expenses,
  setExpenses,
  totalExpense,
  setTotalExpense,
}) {
  const deleteItem = (removeItem, expense) => {
    const items = expenses.filter((_, index) => index !== removeItem);
    setTotalExpense(totalExpense - expense);
    setExpenses(items);
  };
  return (
    <div className="h-full w-3/5 bg-white px-10 py-5 space-y-1 rounded-bl-3xl rounded-tl-3xl border-4 border-black overflow-y-auto ">
      <div className="text-2xl font-bold">Bought Items</div>
      <div className="flex flex-col-5 w-full mb-10">
        <div className="w-1/4  flex  text-lg font-bold">Item</div>
        <div className="w-1/4  flex  text-lg font-bold">Unit Price</div>
        <div className="w-1/4 flex text-lg font-bold">Quantity</div>
        <div className="w-1/4  flex text-lg font-bold">Expense</div>
        <div className="w-1/4 flex  text-lg font-bold"></div>
      </div>

      {expenses?.map((item, index) => {
        const expense = parseFloat(item.item.buyingPrice * item.quantity);
        return (
          <div
            className="flex flex-col-5 w-full items-center hover:bg-slate-500 hover:text-white"
            key={index}>
            <div className="w-1/4  flex text-lg">{item.item.itemName}</div>
            <div className="w-1/4  flex text-lg">{item.item.buyingPrice}</div>
            <div className="w-1/4 flex text-lg">{item.quantity}</div>
            <div className="w-1/4  flex text-lg">{expense.toFixed(2)}</div>
            <div className="w-1/4 flex justify-center ">
              <img
                src={deleteButton}
                className="w-5 h-5 bg-white rounded-xl"
                onClick={() => {
                  deleteItem(index, expense);
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
