import React from "react";
import { Link } from "react-router-dom";

export default function ItemReport({ data }) {
  return (
    <div className="flex justify-center mt-5">
      <Link
        to="/inventory/item-report"
        state={data}
        className="hover:bg-blue-500 px-2 py-1 rounded-lg cursor-pointer hover:text-white">
        Item Report
      </Link>
      <Link
        to="/inventory/item-sales"
        state={data}
        className="hover:bg-blue-500 px-2 py-1 rounded-lg cursor-pointer hover:text-white">
        Sale Report
      </Link>
      <Link
        to="/inventory/item-expenses"
        state={data}
        className="hover:bg-blue-500 px-2 py-1 rounded-lg cursor-pointer hover:text-white">
        Expense Report
      </Link>
    </div>
  );
}
