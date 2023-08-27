import React, { useEffect, useState } from "react";
import { GetItemStockLog } from "../../../Utility/APICalls";

export default function StockLog({ id }) {
  const [stock, setStock] = useState([]);
  useEffect(() => {
    GetItemStockLog({ id, setStock });
  }, []);
  return (
    <div className="h-full m-2 overflow-y-auto bg-white rounded-lg hide-scrollbar">
      <div className="w-full h-full bg-white rounded-lg flex flex-1 flex-col px-2">
        <div className="flex justify-center text-xl font-bold">Stock Log</div>
        <div className="grid grid-cols-3">
          <div className="font-bold">Old Stock</div>
          <div className="font-bold">New Stock</div>
          <div className="font-bold">Date</div>
        </div>

        {stock?.map((s, index) => {
          return (
            <div className="grid grid-cols-3" key={index}>
              <div>{s.oldStock}</div>
              <div>{s.newStock}</div>
              <div>{s.dateUpdate}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
