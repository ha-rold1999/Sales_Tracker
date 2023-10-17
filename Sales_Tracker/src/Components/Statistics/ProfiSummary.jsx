import React from "react";
import { useQuery } from "react-query";
import {
  GetStoreTotalProfit,
  GetStoreAverageProfit,
} from "../../Utility/APICalls";

export default function ProfiSummary() {
  const {
    data: total,
    isLoading: totalLoading,
    isSuccess: totalSucces,
    isError: totalError,
  } = useQuery(["profitSummary"], async () => await GetStoreTotalProfit(), {
    staleTime: Infinity,
  });

  const {
    data: average,
    isLoading: averageLoading,
    isSuccess: averageSuccess,
    isError: averageError,
  } = useQuery(["averageSummary"], async () => await GetStoreAverageProfit(), {
    staleTime: Infinity,
  });

  //Create a function to format data to phillippine peso
  const formatToPHP = (number) => {
    return number.toLocaleString("en-PH", {
      style: "currency",
      currency: "PHP",
    });
  };

  return (
    <div className="flex flex-row h-full w-full space-x-1  mt-1">
      <div className="w-1/2  h-full  flex items-center flex-col border-2 border-black rounded-lg ">
        <h1 className="text-lg font-bold">Total Profit</h1>
        <div className="flex w-full h-full justify-center items-center  font-bold text-5xl">
          {totalLoading && "Loading..."}
          {totalError && "Something went wrong"}
          {totalSucces && formatToPHP(total)}
        </div>
      </div>
      <div className="w-1/2  h-full  flex items-center flex-col border-2 border-black rounded-lg">
        <h1 className="text-lg font-bold">Average Profit Each Day</h1>
        <div className="flex w-full h-full justify-center items-center  font-bold text-5xl">
          {averageLoading && "Loading..."}
          {averageError && "Something went wrong"}
          {averageSuccess && formatToPHP(average)}
        </div>
      </div>
    </div>
  );
}
