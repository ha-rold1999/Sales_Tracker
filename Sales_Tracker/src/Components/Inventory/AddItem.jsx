import React from "react";
import StockInput from "./Form/StockInput";
import BuyingPriceInput from "./Form/BuyingPriceInput";
import SellingPriceInput from "./Form/SellingPriceInput";
import { useState } from "react";

export default function AddItem() {
  const [itemName, setItemName] = useState("");
  const [stock, setStock] = useState(0);
  const [newStock, setNewStock] = useState(0);
  const [buyingPrice, setBuyingPrice] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="w-2/5 h-fit bg-white px-10 py-5 rounded-lg">
        <div className="flex justify-center text-3xl font-bold">
          Add New Item
        </div>
        <div className="text-lg font-semibold">Name</div>
        <input
          className="text-xl font-bold w-full bg-yellow-500 py-2 px-1 rounded-lg"
          value={itemName}
          placeholder="Item Name"
          onChange={(e) => {
            setItemName(e.target.value);
          }}
        />
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
        <div className="w-full flex justify-center mt-5">
          <button className="py-2 px-1 w-1/2 border-2 border-black rounded-lg text-2xl font-bold bg-orange-500 ">
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
}
