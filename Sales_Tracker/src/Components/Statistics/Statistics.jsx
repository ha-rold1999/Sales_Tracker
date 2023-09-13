import React from "react";
import { GetProfitReport } from "../../Utility/APICalls";
import { useQuery } from "react-query";
import StatisticsCrumbs from "../BreadCrumbs/StatisticsCrumbs";
import ProfitStatistics from "./ProfitStatistics";
import IncomeStatistics from "./IncomeStatistics";
import ItemProfitStatistics from "./ItemProfitStatistics";
import ItemSoldStatistics from "./ItemSoldStatistics";
import ItemsStatistics from "./ItemsStatistics";

export default function Statistics() {
  const {
    data: profit,
    isLoading: profitLoading,
    isSuccess: profitSuccess,
  } = useQuery(["profitReport"], async () => await GetProfitReport());
  const {
    data: income,
    isLoading: incomeLoading,
    isSuccess: incomeSuccess,
  } = useQuery(["profitReport"], async () => await GetProfitReport());

  if (profit.length > 0) {
    return (
      <div className="flex bg-blue-600 h-full w-full flex-col p-5 space-y-2">
        <StatisticsCrumbs />
        <div className="w-full h-1/2 flex justify-center space-x-1">
          <div className="bg-white w-1/2 h-full flex flex-col p-1 border-2 border-black rounded-lg">
            <div className="font-bold text-lg">Profit</div>
            <ProfitStatistics data={profit} />
          </div>
          <div className="bg-white w-1/2 h-full flex flex-col p-1 border-2 border-black rounded-lg">
            <div className="font-bold text-lg">Income</div>
            <IncomeStatistics data={income} />
          </div>
        </div>
        <div className="w-full h-1/2 flex justify-center space-x-1">
          <div className=" w-1/2 h-full flex flex-row">
            <div className="bg-white w-4/5 h-full p-1 border-2 border-black rounded-lg flex flex-col mr-1">
              <div className="font-bold text-lg">Item's Profit</div>
              <ItemProfitStatistics />
            </div>
            <div className="bg-white w-4/5 h-full p-1 border-2 border-black rounded-lg flex flex-col">
              <div className="font-bold text-lg">Item's Sold</div>
              <ItemSoldStatistics />
            </div>
          </div>

          <div className="bg-white w-1/2 h-full flex flex-col p-1 border-2 border-black rounded-lg">
            <ItemsStatistics />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="border-2 border-black px-36 py-5 text-2xl font-bold rounded-lg">
          No Data As of the Moment
        </div>
      </div>
    );
  }
}
