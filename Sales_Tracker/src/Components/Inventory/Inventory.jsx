import { Route, Routes } from "react-router-dom";
import Items from "./Items";
import Item from "./Item";

export default function Inventory() {
  return (
    <Routes>
      <Route path="/" element={<Items />} />
      <Route path="/item" element={<Item />} />
    </Routes>
  );
}
