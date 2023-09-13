import React from "react";
import { Link } from "react-router-dom";

export default function ItemSalesReportCrumbs({ itemName }) {
  return (
    <div className="space-x-1 flex h-fit">
      <Link className="w-fit bg-white px-3 py-1 rounded-lg" to="/menu">
        Menu
      </Link>
      <div className="text-xl text-white">/</div>
      <Link className="w-fit bg-white px-3 py-1 rounded-lg" to="/inventory">
        Inventory
      </Link>
      <div className="text-xl text-white">/</div>
      <button
        className="w-fit bg-white px-3 py-1 rounded-lg"
        onClick={() => window.history.back()}>
        {itemName}
      </button>
      <div className="text-xl text-white">/</div>
      <Link className="w-fit bg-yellow-500 px-3 py-1 rounded-lg">
        Item Sale Report
      </Link>
    </div>
  );
}
