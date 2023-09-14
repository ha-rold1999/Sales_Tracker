import React from "react";
import { GetProfitReport, GetIncomeReport } from "../../Utility/APICalls";
import { useQuery } from "react-query";
import LineStatistics from "./LineStatistics";
import Swal from "sweetalert2";

export default function StoreStatistics() {
  const {
    data: profit,
    isLoading: profitLoading,
    isSuccess: profitSuccess,
    isError: profitError,
  } = useQuery(["profitReport"], async () => await GetProfitReport());
  const {
    data: income,
    isLoading: incomeLoading,
    isSuccess: incomeSuccess,
    isError: incomeError,
  } = useQuery(["incomeReport"], async () => await GetIncomeReport());

  if (profitLoading && incomeLoading) {
    Swal.showLoading();
  }
  if (profitSuccess && incomeSuccess) {
    Swal.close();
  }
  if (profitError && incomeError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong",
    });
  }

  return (
    <div className="w-full h-1/2 flex justify-center space-x-1">
      <div className="bg-white w-1/2 h-full flex flex-col p-1 border-2 border-black rounded-lg">
        <div className="font-bold text-lg">Profit</div>
        <LineStatistics data={profit} />
      </div>
      <div className="bg-white w-1/2 h-full flex flex-col p-1 border-2 border-black rounded-lg">
        <div className="font-bold text-lg">Income</div>
        <LineStatistics data={income} />
      </div>
    </div>
  );
}
