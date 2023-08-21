import React from "react";
import "../../Style/style.css";
import { useState } from "react";
import DropBox from "./Form/DropBox";
import Sold from "./Form/Sold";
import Total from "./Total";
import SoldItems from "./Sold";
import Stock from "./Stock";
import { AddSales, GetItems } from "../../Utility/APICalls";
import { SetSales } from "../../Utility/SetData";
import { useQuery } from "react-query";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { HandleSales, HandleSaveAllSales } from "../../Utility/configuration";

export default function Sales() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data } = useQuery(["items"], GetItems);

  const [selectedItem, setSelectedItem] = useState();
  const [sales, setSales] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [totalProfit, setTootalProfit] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [isItemSelected, setIsItemSelected] = useState(true);
  const [isSoldGreaterThanZero, setIsSoldGreaterThanZero] = useState(true);
  const [isSoldLessThanStock, setIsSoldLessThanStock] = useState(true);
  const [isSalesExist, setIsSalesExist] = useState(true);

  const handelSelectChange = (e) => {
    setSelectedItem(e.target.value);
    setIsItemSelected(true);
  };

  const handleSales = () => {
    HandleSales({
      selectedItem,
      setIsItemSelected,
      quantity,
      setIsSoldGreaterThanZero,
      setIsSoldLessThanStock,
      SetSales,
      setTootalProfit,
      totalProfit,
      setTotalIncome,
      totalIncome,
      setSales,
      sales,
    });
  };

  const handleSaveAllSales = async () => {
    await HandleSaveAllSales({
      sales,
      queryClient,
      AddSales,
      navigate,
      setIsSalesExist,
    });
  };

  return (
    <div className="flex flex-col-2 h-full">
      <div className="h-full w-2/5 px-10 py-5 flex justify-center items-center flex-col">
        <div className="flex flex-1 items-start">
          <Link className="bg-white px-3 py-1 rounded-lg" to="/">
            back to menu
          </Link>
        </div>
        <div className="w-full">
          <DropBox
            handelSelectChange={handelSelectChange}
            selectedItem={selectedItem}
            items={data}
          />
          {!isItemSelected && (
            <span className="text-red-600">Please select an item</span>
          )}
          <Stock
            selectedItem={selectedItem}
            setIsItemSelected={setIsItemSelected}
          />
          <div className="flex justify-center space-x-2">
            <div className="text-3xl font-semibold">Sold</div>
            <Sold setQuantity={setQuantity} />
          </div>
          {!isSoldGreaterThanZero && (
            <span className="text-red-600">Set sold greater than 0</span>
          )}
          <div></div>
          {!isSoldLessThanStock && (
            <span className="text-red-600">Set sold lesser than the stock</span>
          )}
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
          {!isSalesExist && (
            <span className="text-red-600">There is no sales to save</span>
          )}
          <Total totalProfit={totalProfit} totalIncome={totalIncome} />
        </div>
      </div>
      <SoldItems
        sales={sales}
        setSales={setSales}
        totalProfit={totalProfit}
        setTootalProfit={setTootalProfit}
        totalIncome={totalIncome}
        setTotalIncome={setTotalIncome}
      />
    </div>
  );
}
