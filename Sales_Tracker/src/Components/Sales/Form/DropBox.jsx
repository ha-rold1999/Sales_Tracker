import React from "react";

export default function DropBox({ handelSelectChange, selectedItem, items }) {
  return (
    <select
      className="w-full p-2 text-2xl rounded-lg mb-5"
      onChange={handelSelectChange}
      value={selectedItem}>
      <option>Select Item</option>
      {items?.map((option) => (
        <option key={option.id} value={JSON.stringify(option)}>
          {option.itemName}
        </option>
      ))}
    </select>
  );
}
