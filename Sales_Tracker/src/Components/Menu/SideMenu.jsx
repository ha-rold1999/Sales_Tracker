import React from "react";
import { faDoorOpen, faX } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { LogoutAPI } from "../../Utility/APICalls";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function SideMenu({ setIsShowMenu }) {
  const handleLogout = () => {
    LogoutAPI();
  };
  return (
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
      <div className=" flex justify-end mb-2">
        <FontAwesomeIcon
          icon={faX}
          className="bg-white cursor-pointer p-2 rounded-lg"
          onClick={() => setIsShowMenu(false)}
        />
      </div>
      <div className="flex flex-col space-y-3">
        <Link
          to="/archive"
          className="bg-white cursor-pointer text-center py-4 text-xl font-semibold rounded-lg border-blue-600 border-2 hover:border-black">
          Archive
        </Link>
        <Link
          to="/account"
          className="bg-white cursor-pointer text-center py-4 text-xl font-semibold rounded-lg border-blue-600 border-2 hover:border-black">
          Profile
        </Link>
        <Link
          to="/danger"
          className="cursor-pointer text-center py-4 text-xl font-semibold rounded-lg border-blue-600 border-2 hover:border-black bg-red-600">
          Account
        </Link>
      </div>

      <div
        className="fixed bottom-0 bg-orange-600 mb-3 cursor-pointer"
        onClick={handleLogout}>
        <div className="px-10">
          Logout
          <FontAwesomeIcon icon={faDoorOpen} />
        </div>
      </div>
    </motion.div>
  );
}
