import React from "react";
import { Link } from "react-router-dom";
import "../../Style/style.css";

export default function Items() {
  const items = [
    { id: 1, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 2, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 3, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 4, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 5, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 6, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 7, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 8, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 9, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 1, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 2, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 3, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 4, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 5, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 6, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 7, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 8, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 9, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 1, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 2, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 3, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 4, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 5, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 6, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 7, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 8, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    { id: 9, itemName: "Tanduay", stock: 50, buyingPrice: 9, sellingPrice: 10 },
    {
      id: 10,
      itemName: "Tanduay",
      stock: 50,
      buyingPrice: 9,
      sellingPrice: 10,
    },
    {
      id: 11,
      itemName: "Tanduay",
      stock: 50,
      buyingPrice: 9,
      sellingPrice: 10,
    },
    {
      id: 12,
      itemName: "Tanduay",
      stock: 50,
      buyingPrice: 9,
      sellingPrice: 10,
    },
    {
      id: 13,
      itemName: "Tanduay",
      stock: 50,
      buyingPrice: 9,
      sellingPrice: 10,
    },
  ];

  return (
    <div className="p-5 space-y-5 flex flex-1 flex-col h-full">
      <div className="flex flex-row items-center space-x-5  p-3">
        <div className="text-5xl font-bold text-yellow-300">Items</div>
        <Link
          to="add-item"
          className="bg-green-500 py-3 px-5 py-10 text-xl font-bold border-2 border-black rounded-lg">
          Add item
        </Link>
      </div>

      <div className="h-full overflow-y-auto hide-scrollbar">
        <div className="grid gap-2 grid-cols-3 ">
          {items.map((item, index) => {
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
