import React from "react";
import DropBox from "../Sales/Form/DropBox";
import { useQuery } from "react-query";
import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { GetItems, GetItemReport } from "../../Utility/APICalls";
import ItemSummary from "./ItemSummary";

export default function ItemsStatistics() {
  const [selectedItem, setSelectedItem] = useState();
  const [itemStat, setItemStat] = useState();
  const [openSummary, setOpenSummary] = useState(false);

  const store = localStorage.getItem("store");
  const { data, isLoading } = useQuery(["items"], () => GetItems({ store }), {
    staleTime: Infinity,
  });
  const handleSetSearch = async () => {
    if (selectedItem) {
      const itemId = selectedItem.value.id;
      setItemStat(await GetItemReport({ itemId }));
    }
  };
  return (
    <>
      <div className="flex flex-row justify-between">
        <div className="w-4/5 flex flex-row space-x-1">
          {!openSummary && (
            <DropBox
              setSelectedItem={setSelectedItem}
              selectedItem={selectedItem}
              items={data}
            />
          )}
          {openSummary && (
            <div className=" flex items-center font-bold text-xl">
              {selectedItem.value.itemName}
            </div>
          )}
          <div className="flex flex-row justify-center items-center ">
            {!openSummary && (
              <div
                className="bg-blue-400 p-1 rounded-lg border-2 border-black cursor-pointer"
                onClick={handleSetSearch}>
                Data
              </div>
            )}
          </div>
        </div>
        {selectedItem && (
          <button
            className="bg-green-500 p-1 rounded-lg border-2 border-black"
            onClick={() => setOpenSummary(!openSummary)}>
            {openSummary ? "Report" : "Summary"}
          </button>
        )}
      </div>
      {!selectedItem && (
        <span className="text-red-600">Please select an item</span>
      )}

      {!openSummary && (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={300} height={100} data={itemStat}>
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
      )}
      {openSummary && <ItemSummary id={selectedItem.value.id} />}
    </>
  );
}
