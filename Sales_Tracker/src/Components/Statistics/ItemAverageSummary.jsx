import React from "react";
import { useQuery } from "react-query";
import {
  GetStoreItemAverageProfit,
  GetStoreItemAverageIncome,
} from "../../Utility/APICalls";
import { formatToPHP } from "../../Utility/configuration";

function ItemAverageSummary({ id }) {
  const {
    data: propfitAverage,
    isLoading: profiAverageLoading,
    isSuccess: profiAverageSuccess,
    isError: profiAverageError,
  } = useQuery(["itemProfitAverage"], () => GetStoreItemAverageProfit(id));

  const {
    data: incomeAverage,
    isLoading: incomeAverageLoading,
    isSuccess: incomeAverageSuccess,
    isError: incomeAverageError,
  } = useQuery(["itemAvearageIncome"], () => GetStoreItemAverageIncome(id));

  return (
    <div className="w-1/3  border-black border-2 rounded-lg p-1 space-y-1">
      <div className="w-full h-1/2 ">
        <div className="w-full flex justify-center">Average Profit</div>
        <div className="flex justify-center items-center w-full h-1/2  text-xl">
          {profiAverageSuccess && formatToPHP(propfitAverage)}
          {profiAverageLoading && "Loading..."}
          {profiAverageError && "Something went wrong"}
        </div>
      </div>
      <div className="w-full h-1/2 ">
        <div className="w-full flex justify-center">Average Income</div>
        <div className="flex justify-center items-center w-full h-1/2  text-xl">
          {incomeAverageSuccess && formatToPHP(incomeAverage)}
          {incomeAverageLoading && "Loading..."}
          {incomeAverageError && "Something went wrong"}
        </div>
      </div>
    </div>
  );
}

export default React.memo(ItemAverageSummary, (prev, next) => {
  return prev.id === next.id;
});
