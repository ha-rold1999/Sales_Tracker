import React from "react";
import { Link } from "react-router-dom";
import "../../Style/style.css";
import { useQuery } from "react-query";
import { GetItems } from "../../Utility/APICalls";
import { useSelector } from "react-redux";

export default function Items() {
  const { store } = useSelector((state) => state.storeSlice);

  const { data } = useQuery(["items"], () => GetItems({ store }));

  return (
    <div className="p-5 space-y-5 flex flex-1 flex-col h-full">
      <Link className="w-fit bg-white px-3 py-1 rounded-lg" to="/menu">
        back to menu
      </Link>
      <div className="flex flex-row items-center space-x-5  p-3">
        <div className="text-5xl font-bold text-yellow-300">Items</div>
        <Link
          to="add-item"
          className="bg-green-500 py-3 px-5 text-xl font-bold border-2 border-black rounded-lg">
          Add item
        </Link>
      </div>

      <div className="h-full overflow-y-auto hide-scrollbar">
        <div className="grid gap-2 grid-cols-3 ">
          {data?.map((item, index) => {
            return (
              <Link
                to="/inventory/item"
                state={item}
                key={index}
                className={`flex justify-center h-20 items-center rounded-lg ${
                  item.stock < 10 ? "bg-red-500" : "bg-white"
                }`}>
                <div className="text-xl font-bold">{item.itemName}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
