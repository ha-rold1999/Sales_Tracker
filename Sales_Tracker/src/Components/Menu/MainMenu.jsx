import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import SideMenu from "./SideMenu";

export default function MainMenu() {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const store = JSON.parse(localStorage.getItem("store")).storeName;

  return (
    <div className="w-3/5 h-screen bg-yellow-500 flex item-center flex-col">
      <div className="flex flex-row">
        <div
          className="ml-5 mt-2 bg-green-600 h-fit w-fit py-1 px-3 rounded-lg cursor-pointer"
          onClick={() => setIsShowMenu(true)}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div className="text-4xl font-extrabold mb-10 w-5/6 flex justify-center text-center">
          {store}
        </div>
      </div>

      {isShowMenu && <SideMenu setIsShowMenu={setIsShowMenu} />}

      <div className="flex justify-center items-center flex-1 flex-col">
        <div className="flex justify-center items-center flex-col space-y-5  w-full">
          <Link
            to="/inventory"
            className="bg-violet-500 w-4/5 justify-center items-center flex py-2 text-2xl font-bold rounded-lg cursor-pointer">
            Inventory
          </Link>
          <Link
            to="/sales"
            className="bg-red-400 w-4/5 justify-center items-center flex py-2 text-2xl font-bold rounded-lg cursor-pointer">
            Sales
          </Link>
          <Link
            to="/expenses"
            className="bg-red-900 w-4/5 justify-center items-center flex py-2 text-2xl font-bold rounded-lg cursor-pointer">
            Expenses
          </Link>
          <Link
            to="/statistics"
            className="bg-orange-500 w-4/5 justify-center items-center flex py-2 text-2xl font-bold rounded-lg cursor-pointer">
            Statistics
          </Link>
        </div>
      </div>
    </div>
  );
}
