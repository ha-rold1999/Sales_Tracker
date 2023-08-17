import React from "react";
import { useState } from "react";
import { GetCurrentDateSalesReport } from "../../Utility/APICalls";

export default function DailyReport() {
  const [profit, setProfit] = useState(0);
  const [income, setIncome] = useState(0);

  GetCurrentDateSalesReport({ setProfit, setIncome });

  const currenDate = new Date();
  const year = currenDate.getFullYear();
  const month = currenDate.getMonth() + 1;
  const day = currenDate.getDate();

  return (
    <div className="w-2/5 h-screen bg-white flex flex-1 item-center justify-center flex-col space-y-5">
      <div className="flex justify-center text-4xl font-bold">{`${month}/${day}/${year}`}</div>
      <div className="flex justify-center text-2xl font-semibold">Profit</div>
      <div className="flex justify-center">
        <div className="bg-blue-500 px-5 px-3 rounded-lg text-2xl">
          ₱ {parseFloat(profit).toFixed(2)}
        </div>
      </div>
      <div className="flex justify-center text-2xl font-semibold">Income</div>
      <div className="flex justify-center">
        <div className="bg-blue-500 px-5 px-3 rounded-lg text-2xl">
          ₱ {parseFloat(income).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
