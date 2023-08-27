import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  GetItemBuyingPriceLog,
  GetItemSellingPriceLog,
  GetItemStockLog,
} from "../../Utility/APICalls";
import StockLog from "./Report/StockLog";
import BuyingPriceLog from "./Report/BuyingPriceLog";
import SellingPriceLog from "./Report/SellingPriceLog";

export default function ItemReport() {
  const location = useLocation();
  const data = location.state;
  return (
    <div className="w-full h-full">
      <div className="flex flex-1 justify-center text-white text-4xl font-bold">
        {data.itemName}
      </div>
      <div className="grid grid-cols-3 w-full h-5/6 place-content-stretch">
        <StockLog id={data.id} />
        <BuyingPriceLog id={data.id} />
        <SellingPriceLog id={data.id} />
      </div>
    </div>
  );
}
