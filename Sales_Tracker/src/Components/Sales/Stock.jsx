import React from "react";

export default function Stock({ selectedItem, setIsItemSelected }) {
  return (
    <div className="text-lg font-semibold flex col">
      Stock:
      <div className="font-bold">
        {(() => {
          try {
            const parsedItem = JSON.parse(selectedItem);
            return parsedItem.stock;
          } catch (error) {
            setIsItemSelected(false);
            return 0; // Default value if parsing fails
          }
        })()}
      </div>
    </div>
  );
}
