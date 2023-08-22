import React from "react";

export default function BuyingPriceInput({ register }) {
  return (
    <div>
      <input
        placeholder="0.00"
        className="text-xl font-bold w-full bg-yellow-500 py-2 px-1 rounded-lg"
        type="number"
        step="0.01"
        {...register("buyingPrice")}
      />
    </div>
  );
}
