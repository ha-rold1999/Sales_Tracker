import React from "react";
import Swal from "sweetalert2";
import { CheckAuthorization } from "../../Utility/APICalls";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { HandeDeleteAccount } from "../../Utility/configuration";
import DangerCrumbs from "../BreadCrumbs/DangerCrumbs";

export default function Danger() {
  const handleDeleteAccount = () => {
    HandeDeleteAccount();
  };

  useEffect(() => {
    if (!Cookies.get("auth_token")) {
      window.location.href = "/";
      return;
    }
  }, []);
  return (
    <div className="flex w-full h-full flex-col p-5">
      <DangerCrumbs />
      <div className="flex justify-center items-center flex-col h-full flex-1 space-y-10">
        <Link
          className="w-1/2 py-5 bg-orange-600 flex justify-center rounded-lg"
          to="/change-password">
          <div className="text-2xl font-bold">Change Password</div>
        </Link>
        <div
          className="w-1/2 py-5  flex justify-center rounded-lg border-red-600 border-2 hover:bg-red-600 cursor-pointer"
          onClick={handleDeleteAccount}>
          <div className="text-2xl font-bold">Delete Account</div>
        </div>
      </div>
    </div>
  );
}
