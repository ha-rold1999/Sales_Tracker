import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import StockLog from "./Report/StockLog";
import BuyingPriceLog from "./Report/BuyingPriceLog";
import SellingPriceLog from "./Report/SellingPriceLog";
import Cookies from "js-cookie";
import ItemReportCrumbs from "../BreadCrumbs/ItemReportCrumbs";

export default function ItemReport() {
  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    if (!Cookies.get("auth_token")) {
      window.location.href = "/";
      return;
    }
  }, []);
  return (
    <div className="w-full h-full p-5">
      <ItemReportCrumbs itemName={data.itemName} />
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
