import React from "react";
import { useQuery } from "react-query";
import {
  GetStoreTotalIncome,
  GetStoreAverageIncome,
} from "../../Utility/APICalls";

export default function IncomeSummary() {
  const {
    data: total,
    isLoading: totalLoading,
    isSuccess: totalSucces,
    isError: totalError,
  } = useQuery(["incomeTotal"], async () => await GetStoreTotalIncome(), {
    staleTime: Infinity,
  });

  const {
    data: average,
    isLoading: averageLoading,
    isSuccess: averageSuccess,
    isError: averageError,
  } = useQuery(["averageIncome"], async () => await GetStoreAverageIncome(), {
    staleTime: Infinity,
  });

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
