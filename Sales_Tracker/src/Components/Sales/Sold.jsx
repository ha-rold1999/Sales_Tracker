import React from "react";
import deleteButton from "./../../assets/delete-button.png";

export default function SoldItems({
  sales,
  setSales,
  totalProfit,
  setTootalProfit,
  totalIncome,
  setTotalIncome,
}) {
  const deleteItem = (removeItem, profit, income) => {
    const items = sales.filter((_, index) => index !== removeItem);
    setTootalProfit(totalProfit - profit);
    setTotalIncome(totalIncome - income);
    setSales(items);
  };
  return (
    <div className="h-full w-3/5 bg-white px-10 py-5 space-y-1 rounded-bl-3xl rounded-tl-3xl border-4 border-black overflow-y-auto hide-scrollbar">
      <div className="text-2xl font-bold">Sales</div>
      <div className="flex flex-col-5 w-full mb-10">
        <div className="w-1/4  flex  text-lg font-bold">Item</div>
        <div className="w-1/4 flex text-lg font-bold">Quantity</div>
        <div className="w-1/4  flex text-lg font-bold">Profit</div>
        <div className="w-1/4 flex  text-lg font-bold">Income</div>
        <div className="w-1/4 flex  text-lg font-bold"></div>
      </div>

      {sales?.map((item, index) => {
        console.log(item);
        const profit = parseFloat(item.item.sellingPrice * item.quantity);
        const income = parseFloat(
          profit - item.item.buyingPrice * item.quantity
        );
        return (
          <div className="flex flex-col-5 w-full items-center hover:bg-slate-500 hover:text-white">
            <div className="w-1/4  flex text-lg">{item.item.itemName}</div>
            <div className="w-1/4 flex text-lg">{item.quantity}</div>
            <div className="w-1/4  flex text-lg">{profit.toFixed(2)}</div>
            <div className="w-1/4 flex text-lg">{income.toFixed(2)}</div>
            <div className="w-1/4 flex justify-center ">
              <img
                src={deleteButton}
                className="w-5 h-5 bg-white rounded-xl"
                onClick={() => {
                  deleteItem(index, profit, income);
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
