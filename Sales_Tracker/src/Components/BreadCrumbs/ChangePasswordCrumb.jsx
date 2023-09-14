import React from "react";
import { Link } from "react-router-dom";

export default function ChangePasswordCrumb() {
  return (
    <div className="flex h-fit items-start w-full space-x-1">
      <Link className="w-fit h-fit bg-white px-3 py-1 rounded-lg" to="/menu">
        Menu
      </Link>
      <div className="text-xl text-white">/</div>
      <Link className="w-fit h-fit bg-white px-3 py-1 rounded-lg" to="/danger">
        Account
      </Link>
      <div className="text-xl text-white">/</div>
      <Link className="w-fit h-fit bg-yellow-500 px-3 py-1 rounded-lg">
        Change Password
      </Link>
    </div>
  );
}
