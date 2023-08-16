import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import StockInput from "./Form/StockInput";
import BuyingPriceInput from "./Form/BuyingPriceInput";
import SellingPriceInput from "./Form/SellingPriceInput";
import { UpdateItemAPI } from "../../Utility/APICalls";

export default function Item() {
  const location = useLocation();
  const data = location.state;

  const [stock, setStock] = useState(data.stock);
  const [newStock, setNewStock] = useState(0);
  const [buyingPrice, setBuyingPrice] = useState(data.buyingPrice);
  const [sellingPrice, setSellingPrice] = useState(data.sellingPrice);
  const [isItemTheSame, setIsItemTheSame] = useState(true);

  useEffect(() => {
    if (
      data.stock !== stock ||
      data.buyingPrice !== buyingPrice ||
      data.sellingPrice !== sellingPrice
    ) {
      console.log("changed");
      setIsItemTheSame(false);
    } else {
      setIsItemTheSame(true);
    }
  }, [stock, buyingPrice, sellingPrice]);

  const handleUpdateItem = () => {
    UpdateItemAPI({ data, stock, buyingPrice, sellingPrice });
  };

  return (
    <div className="flex flex-1 w-full h-full justify-center items-center">
      <div className="w-2/5 h-fit bg-white px-10 py-5 rounded-lg">
        <div className="flex justify-center text-3xl font-bold">
          {data.itemName}
        </div>
        <div className="text-lg font-semibold">Stock</div>
        <StockInput
          newStock={newStock}
          stock={stock}
          setNewStock={setNewStock}
          setStock={setStock}
        />
        <div className="text-lg font-semibold">Buying Price</div>
        <BuyingPriceInput
          buyingPrice={buyingPrice}
          setBuyingPrice={setBuyingPrice}
        />
        <div className="text-lg font-semibold">Selling Price</div>
        <SellingPriceInput
          sellingPrice={sellingPrice}
          setSellingPrice={setSellingPrice}
        />
        <div className="flex justify-center mt-5">
          <button
            className={`py-2 px-1 w-1/2 border-2 border-black rounded-lg text-2xl font-bold ${
              isItemTheSame ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500"
            }`}
            onClick={handleUpdateItem}
            disabled={isItemTheSame}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
