import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GetItemSaleLog } from "../../Utility/APICalls";

export default function () {
  const [sales, setSales] = useState([]);
  const location = useLocation();
  const data = location.state;
  useEffect(() => {
    if (!Cookies.get("auth_token")) {
      window.location.href = "/";
      return;
    }
    const id = data.id;
    GetItemSaleLog({ id, setSales });
  }, []);
  return (
    <div className="w-full h-full flex flex-1 justify-center overflow-hidden">
      <div className="w-1/2 h-full py-5 flex flex-col">
        <div className="w-full h-full bg-white rounded-lg flex flex-1 flex-col px-10 overflow-y-auto">
          <div className="flex justify-center text-2xl font-bold">
            {data.itemName} Sales Report
          </div>
          <div className="grid grid-cols-4">
            <div className="font-bold">Quantity</div>
            <div className="font-bold">Profit</div>
            <div className="font-bold">Income</div>
            <div className="font-bold">Date</div>
          </div>
          {sales?.map((sale, index) => {
            return (
              <div className="grid grid-cols-4" key={index}>
                <div>{sale.quantity}</div>
                <div>{sale.profit}</div>
                <div>{sale.income}</div>
                <div>{sale.sale.date}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
