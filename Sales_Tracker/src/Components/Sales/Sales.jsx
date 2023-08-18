import React from "react";
import "../../Style/style.css";
import { useState, useEffect } from "react";
import DropBox from "./Form/DropBox";
import Sold from "./Form/Sold";
import Total from "./Total";
import SoldItems from "./Sold";
import Stock from "./Stock";
import { AddSales, GetItems } from "../../Utility/APICalls";
import { SetSales } from "../../Utility/SetData";
import { useQuery } from "react-query";

export default function Sales() {
  const { data } = useQuery(["items"], GetItems);

  const [selectedItem, setSelectedItem] = useState();
  const [sales, setSales] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [sold, setSold] = useState([]);
  const [totalProfit, setTootalProfit] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  const handelSelectChange = (e) => {
    setSelectedItem(e.target.value);
  };

  const handleSales = () => {
    SetSales({
      selectedItem,
      setTootalProfit,
      totalProfit,
      setTotalIncome,
      totalIncome,
      quantity,
      setSales,
      sales,
      setSold,
      sold,
    });
  };

  const handleSaveAllSales = () => {
    AddSales({ sales });
  };

  return (
    <div className="flex flex-col-2 h-full">
      <div className="h-full w-2/5 px-10 py-5 flex justify-center items-center flex-col">
        <div className="w-full">
          <DropBox
            handelSelectChange={handelSelectChange}
            selectedItem={selectedItem}
            items={data}
          />
          <Stock selectedItem={selectedItem} />
          <div className="flex justify-center space-x-2">
            <div className="text-3xl font-semibold">Sold</div>
            <Sold setQuantity={setQuantity} />
          </div>
          <div className="flex justify-center mt-5">
            <button
              className="bg-green-500 w-1/2 py-5 text-xl font-bold border-2 border-black rounded-lg"
              onClick={handleSales}>
              Add Sale
            </button>
          </div>
          <div className="flex justify-center mt-10">
            <button
              className="bg-orange-500 w-full py-5 text-xl font-bold border-2 border-black rounded-lg"
              onClick={handleSaveAllSales}>
              Save All Sales
            </button>
          </div>
          <Total totalProfit={totalProfit} totalIncome={totalIncome} />
        </div>
      </div>
      <SoldItems sold={sold} />
    </div>
  );
}
