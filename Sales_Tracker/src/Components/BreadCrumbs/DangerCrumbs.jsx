import React from "react";
import { Link } from "react-router-dom";

export default function DangerCrumbs() {
  return (
    <div className="flex items-start w-full space-x-1 h-fit">
      <Link className="w-fit h-fit bg-white px-3 py-1 rounded-lg" to="/menu">
        Menu
      </Link>
      <div className="text-xl text-white">/</div>
      <Link className="w-fit h-fit bg-yellow-500 px-3 py-1 rounded-lg">
        Account
      </Link>
    </div>
  );
}
