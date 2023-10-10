import React from "react";
import { useState } from "react";

export default function StockInput({ setValue, watch, schema, isAdd }) {
  const [newStock, setNewStock] = useState(0);

  const currentStock = watch("stock");

  return (
    <div className="flex flex-row space-x-5">
      <div className="w-1/2 text-xl font-bold bg-yellow-500 py-2 px-1 rounded-lg">
        {watch("stock")}
      </div>
      <div className="flex flex-row space-x-2 justify-end w-1/2 items-center">
        <div
          className="bg-green-500 py-2 px-1 rounded-lg font-medium border-2 border-black cursor-pointer"
          onClick={() => {
            setValue("stock", currentStock + newStock);
            setNewStock(0);
            schema.validateAt("stock", watch("stock"));
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
        {isAdd && (
          <div
            className="bg-red-500 py-2 px-1 rounded-lg font-medium border-2 border-black cursor-pointer"
            onClick={() => {
              setValue("stock", parseInt(parseInt(currentStock) - newStock));
              setNewStock(0);
            }}>
            Subtract
          </div>
        )}
      </div>
    </div>
  );
}
