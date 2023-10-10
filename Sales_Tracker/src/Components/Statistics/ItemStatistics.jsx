import React from "react";
import ItemsStatistics from "./ItemsStatistics";
import { useQuery } from "react-query";
import PieStatistics from "./PieStatistics";
import { GetItemProfitReport, GetItemSoldReport } from "../../Utility/APICalls";
import Swal from "sweetalert2";

export default function ItemStatistics() {
  const {
    data: profit,
    isLoading: profitLoading,
    isSuccess: profitSuccess,
    isError: profitError,
  } = useQuery(["itemsProfit"], async () => await GetItemProfitReport(), {
    staleTime: Infinity,
  });
  const {
    data: sold,
    isLoading: soldLoading,
    isSuccess: soldSuccess,
    isError: soldError,
  } = useQuery(["itemsSold"], async () => await GetItemSoldReport(), {
    staleTime: Infinity,
  });

  if (profitLoading && soldLoading) {
    Swal.showLoading();
  }
  if (profitSuccess && soldSuccess) {
    Swal.close();
  }
  if (profitError && soldError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong",
    });
  }

  return (
    <div className="w-full h-1/2 flex justify-center space-x-1">
      <div className=" w-1/2 h-full flex flex-row">
        <div className="bg-white w-4/5 h-full p-1 border-2 border-black rounded-lg flex flex-col mr-1">
          <div className="font-bold text-lg">Item's Profit</div>
          <PieStatistics data={profit} />
        </div>
        <div className="bg-white w-4/5 h-full p-1 border-2 border-black rounded-lg flex flex-col">
          <div className="font-bold text-lg">Item's Sold</div>
          <PieStatistics data={sold} />
        </div>
      </div>

      <div className="bg-white w-1/2 h-full flex flex-col p-1 border-2 border-black rounded-lg">
        <ItemsStatistics />
      </div>
    </div>
  );
}
