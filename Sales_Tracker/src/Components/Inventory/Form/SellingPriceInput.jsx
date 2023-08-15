import React from "react";

export default function SellingPriceInput({ sellingPrice, setSellingPrice }) {
  return (
    <div>
      <input
        className="text-xl font-bold w-full bg-yellow-500 py-2 px-1 rounded-lg"
        type="number"
        value={sellingPrice}
        onChange={(val) => {
          setSellingPrice(parseFloat(val.target.value));
        }}
      />
    </div>
  );
}
