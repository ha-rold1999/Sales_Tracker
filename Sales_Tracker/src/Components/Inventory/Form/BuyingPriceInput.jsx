import React from "react";

export default function BuyingPriceInput({ register }) {
  return (
    <div>
      <input
        className="text-xl font-bold w-full bg-yellow-500 py-2 px-1 rounded-lg"
        type="number"
        {...register("buyingPrice")}
      />
    </div>
  );
}
