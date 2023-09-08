import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { LogoutAPI } from "../../Utility/APICalls";

export default function MainMenu() {
  const [isShowMenu, setIsShowMenu] = useState(false);

  const handleLogout = () => {
    LogoutAPI();
  };
  return (
    <div className="w-3/5 h-screen bg-yellow-500 flex item-center flex-col">
      <div
        className="ml-5 mt-2 bg-green-600 h-fit w-fit py-1 px-3 rounded-lg cursor-pointer"
        onClick={() => setIsShowMenu(true)}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      {isShowMenu && (
        <motion.div
          className="w-1/6 fixed top-0 left-0 z-40 h-screen bg-blue-600 border-2 border-black rounded-r-lg p-3"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "-100%" }}
          transition={{
            type: "spring",
            duration: 0.5,
            damping: 20,
          }}>
          <div
            className="bg-white cursor-pointer flex "
            onClick={() => setIsShowMenu(false)}>
            Close
          </div>
          <div className="bg-white cursor-pointer ">Profile</div>
          <div className="bg-white cursor-pointer ">Account</div>
          <div
            className="fixed bottom-0 bg-red-600 mb-3 cursor-pointer"
            onClick={handleLogout}>
            <div className="px-10">
              Logout
              <FontAwesomeIcon icon={faDoorOpen} />
            </div>
          </div>
        </motion.div>
      )}

      <div className="flex justify-center items-center flex-1 ">
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
        </div>
      </div>
    </div>
  );
}
