import React, { useEffect, useState } from "react";
import { GetItemBuyingPriceLog } from "../../../Utility/APICalls";

export default function BuyingPriceLog({ id }) {
  const [buyingPrice, setBuyingPrice] = useState([]);
  useEffect(() => {
    GetItemBuyingPriceLog({ id, setBuyingPrice });
  }, []);
  return (
    <div className="h-full m-2 overflow-y-auto bg-white rounded-lg">
      <div className="w-full h-full bg-white rounded-lg flex flex-1 flex-col px-2 overflow-y-auto hide-scrollbar">
        <div className="flex justify-center text-xl font-bold">
          Buying Price Log
        </div>
        <div className="grid grid-cols-3">
          <div className="font-bold">Old Price</div>
          <div className="font-bold">New Price</div>
          <div className="font-bold">Date</div>
        </div>
        {buyingPrice?.map((s, index) => {
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
