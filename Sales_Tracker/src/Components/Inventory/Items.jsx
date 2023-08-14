import React from "react";
import { Link } from "react-router-dom";

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
    <div className="grid gap-4 grid-cols-6 p-5">
      {items.map((item, index) => {
        return (
          <Link
            to="/inventory/item"
            state={item}
            key={index}
            className="bg-white flex justify-center">
            <div>{item.itemName}</div>
          </Link>
        );
      })}
    </div>
  );
}
