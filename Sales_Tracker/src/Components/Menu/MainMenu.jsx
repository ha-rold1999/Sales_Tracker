import React from "react";
import { Link } from "react-router-dom";

export default function MainMenu() {
  return (
    <div className="w-3/5 h-screen bg-yellow-500 flex justify-centerm item-center flex-1">
      <div className="flex justify-center items-center flex-col flex-1 space-y-5">
        <Link
          to="/inventory"
          className="bg-violet-500 w-4/5 justify-center items-center flex py-2 text-2xl font-bold rounded-lg cursor-pointer">
          Inventory
        </Link>
        <Link
          to="/sales"
          className="bg-red-400 w-4/5 justify-center items-center flex py-2 text-2xl font-bold rounded-lg cursor-pointer">
          Sales
        </Link>
        <Link
          to="/expenses"
          className="bg-red-900 w-4/5 justify-center items-center flex py-2 text-2xl font-bold rounded-lg cursor-pointer">
          Expenses
        </Link>
      </div>
    </div>
  );
}
