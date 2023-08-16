import React from "react";

export default function Stock({ selectedItem }) {
  return (
    <div className="text-lg font-semibold flex col">
      Stock:
      <div className="font-bold">
        {selectedItem ? JSON.parse(selectedItem).stock : 0}
      </div>
    </div>
  );
}
