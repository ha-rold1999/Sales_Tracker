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

export default function ItemsStatistics() {
  const [selectedItem, setSelectedItem] = useState();
  const [itemStat, setItemStat] = useState();
  const store = localStorage.getItem("store");
  const { data, isLoading } = useQuery(["items"], () => GetItems({ store }));
  const handleSetSearch = async () => {
    if (selectedItem) {
      console.log("asdasd" + selectedItem);
      const itemId = selectedItem.value.id;
      setItemStat(await GetItemReport({ itemId }));
    }
  };
  return (
    <>
      <div className="w-4/5 flex flex-row space-x-1">
        <DropBox
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          items={data}
        />
        <div className="flex flex-row justify-center items-center ">
          <div
            className="bg-blue-400 p-1 rounded-lg border-2 border-black cursor-pointer"
            onClick={handleSetSearch}>
            Data
          </div>
        </div>
      </div>
      {!selectedItem && (
        <span className="text-red-600">Please select an item</span>
      )}

      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={100} data={itemStat}>
          <CartesianGrid stroke="grey" strokeWidth={2} className="bg-red-500" />
          <Line type="monotone" dataKey="sale" stroke="green" strokeWidth={3} />

          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
