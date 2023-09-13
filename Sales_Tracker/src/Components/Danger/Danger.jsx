import React from "react";
import Swal from "sweetalert2";
import { CheckAuthorization } from "../../Utility/APICalls";
import { Link } from "react-router-dom";

export default function Danger() {
  const handleDeleteAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title:
            "To confirm delete account please enter your username and password",
          html:
            '<input type="text" id="text" class="swal2-input" placeholder="Enter Usernamne">' +
            '<input type="password" id="password" class="swal2-input" autocapitalize="off" placeholder="Enter your password">',
          showCancelButton: true,
          confirmButtonText: "Look up",
          showLoaderOnConfirm: true,
          preConfirm: () => {
            const login = {
              username: document.getElementById("text").value,
              password: document.getElementById("password").value,
            };
            CheckAuthorization({ login });
          },
          allowOutsideClick: () => !Swal.isLoading(),
        });
      }
    });
  };
  return (
    <div className="flex w-full h-full flex-col p-5">
      <div className="flex items-start w-full space-x-1 h-fit">
        <Link className="w-fit h-fit bg-white px-3 py-1 rounded-lg" to="/menu">
          Menu
        </Link>
        <div className="text-xl text-white">/</div>
        <Link className="w-fit h-fit bg-yellow-500 px-3 py-1 rounded-lg">
          Account
        </Link>
      </div>
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
