import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  GetItemBuyingPriceLog,
  GetItemSellingPriceLog,
  GetItemStockLog,
} from "../../Utility/APICalls";

export default function ItemReport() {
  const [stock, setStock] = useState([]);
  const [buyingPrice, setBuyingPrice] = useState([]);
  const [sellingPrice, setSellingPrice] = useState([]);
  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    const id = data.id;
    GetItemStockLog({ id, setStock });
    GetItemBuyingPriceLog({ id, setBuyingPrice });
    GetItemSellingPriceLog({ id, setSellingPrice });
  }, []);
  return (
    <div className="w-full h-full">
      <div className="flex flex-1 justify-center text-white text-4xl font-bold">
        {data.itemName}
      </div>
      <div className="grid grid-cols-3 w-full h-5/6 place-content-stretch">
        <div className="h-full m-2 overflow-y-auto bg-white rounded-lg hide-scrollbar">
          <div className="w-full h-full bg-white rounded-lg flex flex-1 flex-col px-2">
            <div className="flex justify-center text-xl font-bold">
              Stock Log
            </div>
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
      </div>
    </div>
  );
}
