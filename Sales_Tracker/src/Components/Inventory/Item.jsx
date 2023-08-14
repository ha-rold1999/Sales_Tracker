import React from "react";
import { useLocation } from "react-router-dom";

export default function Item() {
  const location = useLocation();
  const data = location.state;
  return (
    <div className="w-32 h-32 bg-white">
      <div>{data.itemName}</div>
    </div>
  );
}
