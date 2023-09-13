import React from "react";

export default function Stock({ selectedItem }) {
  return (
    <div className="text-lg font-semibold flex col">
      Stock:
      <div className="font-bold">
        {(() => {
          try {
            const parsedItem = selectedItem.value;
            return parsedItem.stock;
          } catch (error) {
            return 0; // Default value if parsing fails
          }
        })()}
      </div>
    </div>
  );
}
