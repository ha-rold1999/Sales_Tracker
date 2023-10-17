import React from "react";
import { useQuery } from "react-query";
import { GetStoreTotalItemsSold } from "../../Utility/APICalls";
import ItemSold from "./ItemSold";

export default function ItemSummary({ id }) {
  const {
    data: totalSold,
    isLoading: totalSoldLoading,
    isSuccess: totalSoldSuccess,
    isError: totalSoldError,
  } = useQuery(["itemSold"], () => GetStoreTotalItemsSold(id), {
    staleTime: Infinity,
  });

  return (
    <div className="w-full h-full  p-1 flex flex-row space-x-1">
      <div className="w-1/3  border-black border-2 rounded-lg p-1 space-y-1">
        <div className="w-full h-1/2 ">
          <div className="w-full flex justify-center">Average Profit</div>
          <div className="flex justify-center items-center w-full h-1/2  text-xl">
            1,000,000.00
          </div>
        </div>
        <div className="w-full h-1/2 ">
          <div className="w-full flex justify-center">Average Income</div>
          <div className="flex justify-center items-center w-full h-1/2  text-xl">
            1,000,000.00
          </div>
        </div>
      </div>
      <div className="w-1/3  border-black border-2 rounded-lg p-1 space-y-1">
        <div className="w-full h-1/2 ">
          <div className="w-full flex justify-center">Total Profit </div>
          <div className="flex justify-center items-center w-full h-1/2  text-xl">
            1,000,000.00
          </div>
        </div>
        <div className="w-full h-1/2 ">
          <div className="w-full flex justify-center">Total Income</div>
          <div className="flex justify-center items-center w-full h-1/2  text-xl">
            1,000,000.00
          </div>
        </div>
      </div>

      <ItemSold id={id} />
    </div>
  );
}
