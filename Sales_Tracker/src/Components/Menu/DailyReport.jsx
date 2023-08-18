import React from "react";
import { GetCurrentDateSalesReport } from "../../Utility/APICalls";
import { useQuery } from "react-query";

export default function DailyReport() {
  const currenDate = new Date();
  const year = currenDate.getFullYear();
  const month = currenDate.getMonth() + 1;
  const day = currenDate.getDate();

  const { data, isLoading, isError } = useQuery(
    ["sales", year, month, day],
    GetCurrentDateSalesReport
  );
  if (isLoading) {
    console.log("loading data");
  }
  if (isError) {
    console.log(error);
  }

  return (
    <div className="w-2/5 h-screen bg-white flex flex-1 item-center justify-center flex-col space-y-5">
      <div className="flex justify-center text-4xl font-bold">{`${month}/${day}/${year}`}</div>
      <div className="flex justify-center text-2xl font-semibold">Profit</div>
      <div className="flex justify-center">
        <div className="bg-blue-500 px-5 px-3 rounded-lg text-2xl">
          ₱ {parseFloat(data?.totalProfit).toFixed(2)}
        </div>
      </div>
      <div className="flex justify-center text-2xl font-semibold">Income</div>
      <div className="flex justify-center">
        <div className="bg-blue-500 px-5 px-3 rounded-lg text-2xl">
          ₱ {parseFloat(data?.totalIncome).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
