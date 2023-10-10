import React from "react";
import { Link } from "react-router-dom";

const SalesCrumbs = React.memo(() => (
  <div className="flex flex-1 items-start w-full space-x-1">
    <Link className="w-fit h-fit bg-white px-3 py-1 rounded-lg" to="/menu">
      Menu
    </Link>
    <div className="text-xl text-white">/</div>
    <Link className="w-fit h-fit bg-yellow-500 px-3 py-1 rounded-lg">
      Sales
    </Link>
  </div>
));

export default SalesCrumbs;
