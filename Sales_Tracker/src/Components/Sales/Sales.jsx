import React from "react";
import "../../Style/style.css";
import { useState, useEffect } from "react";
import DropBox from "./Form/DropBox";
import Sold from "./Form/Sold";
import Total from "./Total";
import SoldItems from "./Sold";
import Stock from "./Stock";
import { AddSales, GetItems } from "../../Utility/APICalls";

export default function Sales() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    GetItems({ setItems });
  }, []);

  const [selectedItem, setSelectedItem] = useState();
  const [sales, setSales] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [sold, setSold] = useState([]);
  const [totalProfit, setTootalProfit] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    console.log(sales);
  }, [sales]);
  useEffect(() => {}, [selectedItem]);

  const handelSelectChange = (e) => {
    setSelectedItem(e.target.value);
  };

  const handleSales = () => {
    const profit = JSON.parse(selectedItem).sellingPrice * quantity;
    const income = profit - JSON.parse(selectedItem).buyingPrice * quantity;

    setTootalProfit(totalProfit + profit);
    setTotalIncome(totalIncome + income);

    const bought = { item: JSON.parse(selectedItem), quantity: quantity };
    const itemSold = {
      item: JSON.parse(selectedItem).itemName,
      quantity: quantity,
      profit: parseFloat(profit).toFixed(2),
      income: parseFloat(income).toFixed(2),
    };
    setSales([...sales, bought]);
    setSold([...sold, itemSold]);
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
            items={items}
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
