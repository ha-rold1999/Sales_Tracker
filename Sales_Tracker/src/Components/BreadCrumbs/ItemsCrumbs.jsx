import React from "react";
import { Link } from "react-router-dom";

export default function ItemsCrumbs() {
  return (
    <div className="space-x-1 flex">
      <Link className="w-fit bg-white px-3 py-1 rounded-lg" to="/menu">
        Menu
      </Link>
      <div className="text-xl text-white">/</div>
      <Link className="w-fit bg-yellow-500 px-3 py-1 rounded-lg">
        Inventory
      </Link>
    </div>
  );
}
