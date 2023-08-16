import React from "react";
import "../../Style/style.css";
import { useState, useEffect } from "react";
import DropBox from "./Form/DropBox";
import Sold from "./Form/Sold";
import Total from "./Total";
import SoldItems from "./Sold";
import Stock from "./Stock";

export default function Sales() {
  const items = [
    { id: 1, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    {
      id: 2,
      itemName: "C2",
      stock: 50,
      buyingPrice: 9.11,
      sellingPrice: 10.25,
    },
    { id: 3, itemName: "Colt", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    {
      id: 4,
      itemName: "Red Horse",
      stock: 50,
      buyingPrice: 9,
      sellingPrice: 10,
    },
    { id: 5, itemName: "Kulafu", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 6, itemName: "Coke", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 7, itemName: "Pepsi", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 8, itemName: "Royal", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    {
      id: 9,
      itemName: "Small Mountain Dew",
      stock: 50,
      buyingPrice: 9,
      sellingPrice: 10,
    },
  ];

  const [selectedItem, setSelectedItem] = useState();
  const [sales, setSales] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [sold, setSold] = useState([]);
  const [totalProfit, setTootalProfit] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {}, [sales]);
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
            <button className="bg-orange-500 w-full py-5 text-xl font-bold border-2 border-black rounded-lg">
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
