import React from "react";

export default function Total({ totalProfit, totalIncome }) {
  return (
    <div className="mt-12">
      <div className="flex flex-col-2 items-center ">
        <div className="text-xl font-semibold">Total Profit: </div>
        <div className="text-2xl font-bold">
          {" "}
          ₱ {parseFloat(totalProfit).toFixed(2)}
        </div>
      </div>
      <div className="flex flex-col-2 items-center">
        <div className="text-xl font-semibold">Total Income: </div>
        <div className="text-2xl font-bold">
          {" "}
          ₱ {parseFloat(totalIncome).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
