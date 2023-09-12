import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import {
  GetIncomeReport,
  GetItemProfitReport,
  GetItemSoldReport,
  GetProfitReport,
} from "../../Utility/APICalls";

export default function Statistics() {
  const [profit, setProfit] = useState([]);
  const [income, setIncome] = useState([]);
  const [itemProfit, setItemProfit] = useState([]);
  const [itemSold, setItemSold] = useState([]);

  useEffect(() => {
    async function fetData() {
      setProfit(await GetProfitReport());
      setIncome(await GetIncomeReport());
      setItemProfit(await GetItemProfitReport());
      setItemSold(await GetItemSoldReport());
    }
    fetData();
  }, []);

  console.log(itemProfit);

  if (profit.length > 1) {
    return (
      <>
        <div className="w-full h-1/2 flex justify-center p-2  space-x-2">
          <div className="bg-white w-1/2 h-full flex flex-col p-5 border-2 border-black rounded-lg">
            <div className="font-bold text-lg">Profit</div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={300} height={100} data={profit}>
                <CartesianGrid
                  stroke="grey"
                  strokeWidth={2}
                  className="bg-red-500"
                />
                <Line
                  type="monotone"
                  dataKey="sale"
                  stroke="blue"
                  strokeWidth={3}
                  onClick={(data, index) => console.log(data)}
                />

                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white w-1/2 h-full flex flex-col p-5 border-2 border-black rounded-lg">
            <div className="font-bold text-lg">Income</div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={300} height={100} data={income}>
                <CartesianGrid
                  stroke="grey"
                  strokeWidth={2}
                  className="bg-red-500"
                />
                <Line
                  type="monotone"
                  dataKey="sale"
                  stroke="green"
                  strokeWidth={3}
                />

                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="w-full h-1/2 flex justify-center p-2  space-x-2">
          <div className=" w-1/2 h-full flex flex-row space-x-1">
            <div className="bg-white w-1/2 h-full p-5 border-2 border-black rounded-lg flex flex-col">
              <div className="font-bold text-lg">Item's Profit</div>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={300} height={100}>
                  <Pie
                    dataKey="total"
                    data={itemProfit}
                    outerRadius={80}
                    fill="green"
                  />
                  <Tooltip formatter={(value, name) => [value, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white w-1/2 h-full p-5 border-2 border-black rounded-lg flex flex-col">
              <div className="font-bold text-lg">Item's Sold</div>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={300} height={100}>
                  <Pie
                    dataKey="total"
                    data={itemSold}
                    outerRadius={80}
                    fill="orange"
                  />
                  <Tooltip formatter={(value, name) => [value, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white w-1/2 h-full flex flex-col p-5 border-2 border-black rounded-lg">
            <div>Income</div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={300} height={100} data={income}>
                <CartesianGrid
                  stroke="grey"
                  strokeWidth={2}
                  className="bg-red-500"
                />
                <Line
                  type="monotone"
                  dataKey="sale"
                  stroke="green"
                  strokeWidth={3}
                />

                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </>
    );
  }
}
