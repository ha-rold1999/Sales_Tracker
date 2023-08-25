import { Route, Routes } from "react-router-dom";
import Items from "./Items";
import Item from "./Item";
import AddItem from "./AddItem";
import ItemReport from "./ItemReport";
import ItemSaleReport from "./ItemSaleReport";

export default function Inventory() {
  return (
    <Routes>
      <Route path="/" element={<Items />} />
      <Route path="/item" element={<Item />} />
      <Route path="/add-item" element={<AddItem />} />
      <Route path="/item-report" element={<ItemReport />} />
      <Route path="/item-sales" element={<ItemSaleReport />} />
    </Routes>
  );
}
