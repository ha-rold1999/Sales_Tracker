import React from "react";
import ItemSold from "./ItemSold";
import ItemTotalSummary from "./ItemTotalSummary";
import ItemAverageSummary from "./ItemAverageSummary";

export default function ItemSummary({ id }) {
  return (
    <div className="w-full h-full  p-1 flex flex-row space-x-1">
      <ItemAverageSummary id={id} />
      <ItemTotalSummary id={id} />
      <ItemSold id={id} />
    </div>
  );
}
