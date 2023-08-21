import React from "react";

export default function SoldItems({ sales }) {
  // const profit = sales.item.sellingPrice * sales.quantity;
  // const income = profit - sales.item.sellingPrice * sales.quantity;
  console.log(sales[0]?.item.sellingPrice);
  return (
    <div className="h-full w-3/5 bg-white px-10 py-5 space-y-1 rounded-bl-3xl rounded-tl-3xl border-4 border-black overflow-y-auto hide-scrollbar">
      <div className="text-2xl font-bold">Sales</div>
      <div className="flex flex-col-4 w-full mb-10">
        <div className="w-1/4  flex  text-lg font-bold">Item</div>
        <div className="w-1/4 flex text-lg font-bold">Quantity</div>
        <div className="w-1/4  flex text-lg font-bold">Profit</div>
        <div className="w-1/4 flex  text-lg font-bold">Income</div>
      </div>
      {sales?.map((item) => (
        <div className="flex flex-col-4 w-full ">
          <div className="w-1/4  flex text-lg">{item.item.itemName}</div>
          <div className="w-1/4 flex text-lg">{item.quantity}</div>
          <div className="w-1/4  flex text-lg">
            {parseFloat(item.item.sellingPrice * item.quantity).toFixed(2)}
          </div>
          <div className="w-1/4 flex text-lg">
            {parseFloat(
              item.item.sellingPrice * item.quantity -
                item.item.buyingPrice * item.quantity
            ).toFixed(2)}
          </div>
        </div>
      ))}
    </div>
  );
}
