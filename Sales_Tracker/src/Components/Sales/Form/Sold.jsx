import React from "react";

export default function Sold({ setQuantity, quantity }) {
  return (
    <input
      className="w-24 text-3xl font-semibold px-2 rounded-lg"
      type="number"
      placeholder="0"
      onChange={(e) => {
        setQuantity(parseInt(e.target.value));
      }}
      value={quantity}
    />
  );
}
