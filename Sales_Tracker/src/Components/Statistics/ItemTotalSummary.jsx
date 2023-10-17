import React from "react";
import {
  GetStoreTotalItemsProfit,
  GetStoreTotalItemIncom,
} from "../../Utility/APICalls";
import { useQuery } from "react-query";
import { formatToPHP } from "../../Utility/configuration";

export default function ItemTotalSummary({ id }) {
  const {
    data: totalProfit,
    isLoading: totalProfitLoading,
    isSuccess: totalProfitSuccess,
    isError: totalProfitError,
  } = useQuery(["itemTotalProfit"], () => GetStoreTotalItemsProfit(id));

  const {
    data: totalIncome,
    isLoading: totalIncomeLoading,
    isSuccess: totalIncomeSuccess,
    isError: totalIncomeError,
  } = useQuery(["itemTotalIncome"], () => GetStoreTotalItemIncom(id));
  return (
    <div className="w-1/3  border-black border-2 rounded-lg p-1 space-y-1">
      <div className="w-full h-1/2 ">
        <div className="w-full flex justify-center">Total Profit </div>
        <div className="flex justify-center items-center w-full h-1/2  text-xl">
          {totalProfitSuccess && formatToPHP(totalProfit)}
          {totalProfitLoading && "Loading..."}
          {totalProfitError && "Something went wrong"}
        </div>
      </div>
      <div className="w-full h-1/2 ">
        <div className="w-full flex justify-center">Total Income</div>
        <div className="flex justify-center items-center w-full h-1/2  text-xl">
          {totalIncomeSuccess && formatToPHP(totalIncome)}
          {totalIncomeLoading && "Loading..."}
          {totalIncomeError && "Something went wrong"}
        </div>
      </div>
    </div>
  );
}
