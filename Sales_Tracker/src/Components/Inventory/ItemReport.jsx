import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetItemStockLog } from "../../Utility/APICalls";

export default function ItemReport() {
  const [stock, setStock] = useState([]);
  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    const id = data.id;
    GetItemStockLog({ id, setStock });
  }, []);
  return (
    <div className="w-full h-full">
      <div className="flex flex-1 justify-center text-white text-4xl font-bold">
        {data.itemName}
      </div>
      <div className="grid grid-cols-3 w-full h-5/6 place-content-stretch gap-1 ">
        <div className="h-full  p-2">
          <div className="w-full h-full bg-white rounded-lg flex flex-1 flex-col px-2">
            <div className="flex justify-center text-xl font-bold">
              Stock Report
            </div>
            <div className="grid grid-cols-3">
              <div className="font-bold">Old Stock</div>
              <div className="font-bold">New Stock</div>
              <div className="font-bold">Date</div>
            </div>
            {stock.map((s, index) => {
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
        <div className="h-full  p-2">
          <div className="w-full h-full bg-white rounded-lg"></div>
        </div>
        <div className="h-full  p-2">
          <div className="w-full h-full bg-white rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
