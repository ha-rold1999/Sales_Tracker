import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../Style/style.css";
import { useQuery } from "react-query";
import { GetItems } from "../../Utility/APICalls";
import Cookies from "js-cookie";
import ItemsCrumbs from "../BreadCrumbs/ItemsCrumbs";

export default function Items() {
  const store = localStorage.getItem("store");
  const [search, setSearch] = useState("");

  const { data } = useQuery(["items"], () => GetItems({ store }));

  useEffect(() => {
    if (!Cookies.get("auth_token")) {
      window.location.href = "/";
      return;
    }
  }, []);

  const filterData = data?.filter((item) => {
    return item.itemName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="p-5 space-y-5 flex flex-1 flex-col h-full">
      <ItemsCrumbs />
      <div className="flex flex-row items-center space-x-5  p-3">
        <div className="text-5xl font-bold text-yellow-300">Items</div>
        <Link
          to="add-item"
          className="bg-green-500 py-3 px-5 text-xl font-bold border-2 border-black rounded-lg">
          Add item
        </Link>
        <div className="flex  flex-grow  justify-end">
          <input
            className="text-lg px-3 py-1 w-1/2 rounded-lg border-2 border-black"
            placeholder="Search Item"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="h-full overflow-y-auto ">
        <div className="grid gap-2 grid-cols-3 ">
          {filterData?.map((item, index) => {
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
