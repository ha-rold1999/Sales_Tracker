import React, { useEffect, useState } from "react";
import { GetItemSellingPriceLog } from "../../../Utility/APICalls";

export default function SellingPriceLog({ id }) {
  const [sellingPrice, setSellingPrice] = useState([]);
  useEffect(() => {
    GetItemSellingPriceLog({ id, setSellingPrice });
  }, []);
  return (
    <div className="h-full m-2 overflow-y-auto bg-white rounded-lg">
      <div className="w-full h-full bg-white rounded-lg flex flex-1 flex-col px-2 overflow-y-auto hide-scrollbar">
        <div className="flex justify-center text-xl font-bold">
          Selling Price Log
        </div>
        <div className="grid grid-cols-3">
          <div className="font-bold">Old Price</div>
          <div className="font-bold">New Proce</div>
          <div className="font-bold">Date</div>
        </div>
        {sellingPrice?.map((s, index) => {
          return (
            <div className="grid grid-cols-3" key={index}>
              <div>{s.oldPrice}</div>
              <div>{s.newPrice}</div>
              <div>{s.dateUpdate}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
