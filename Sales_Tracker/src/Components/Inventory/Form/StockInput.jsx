import React from "react";

export default function StockInput({ newStock, stock, setNewStock, setStock }) {
  return (
    <div className="flex flex-row space-x-5">
      <div className="w-1/2 text-xl font-bold bg-yellow-500 py-2 px-1 rounded-lg">
        {stock}
      </div>
      <div className="flex flex-row space-x-2 justify-end w-1/2 items-center">
        <div
          className="bg-green-500 py-2 px-1 rounded-lg font-medium border-2 border-black cursor-pointer"
          onClick={() => {
            setStock(newStock + stock);
            setNewStock(0);
          }}>
          Add
        </div>
        <input
          className=" w-14 py-2 px-1 border-2 border-black rounded-lg text-lg font-medium"
          type="number"
          value={newStock}
          onChange={(e) => {
            setNewStock(parseInt(e.target.value));
          }}
        />
        <div
          className="bg-red-500 py-2 px-1 rounded-lg font-medium border-2 border-black cursor-pointer"
          onClick={() => {
            setStock(stock - newStock);
            setNewStock(0);
          }}>
          Subtract
        </div>
      </div>
    </div>
  );
}
