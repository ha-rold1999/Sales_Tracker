import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="flex justify-center  h-full w-full py-1">
      <div className="h-full w-1/2 bg-white border-black border-2 rounded-lg flex justify-center flex-col px-5 pb-5">
        <div className="text-lg font-extrabold justify-center flex mb-1">
          Register
        </div>
        <form className="w-full h-full flex-col flex">
          <label className="text-sm font-medium">Store Name</label>
          <input className="bg-yellow-500 mb-2 p-1 rounded-lg text-sm" />

          <label className="text-sm font-medium">Store Address</label>
          <input className="bg-yellow-500 mb-2 p-1 rounded-lg text-sm" />

          <label className="text-sm font-medium">Store Email</label>
          <input className="bg-yellow-500 mb-2 p-1 rounded-lg text-sm" />

          <div className="flex flex-col-1">
            <div className="flex flex-col w-1/2 mr-1">
              <label className="text-sm font-medium">First Name</label>
              <input className="bg-yellow-500 mb-2 p-1 rounded-lg text-sm" />
            </div>

            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium">Last Name</label>
              <input className="bg-yellow-500 mb-2 p-1 rounded-lg text-sm" />
            </div>
          </div>

          <label className="text-sm font-medium">Username</label>
          <input className="bg-yellow-500 mb-2 p-1 rounded-lg text-sm" />
          <label className="text-sm font-medium">Password</label>
          <input className="bg-yellow-500 mb-2 p-1 rounded-lg text-sm" />
          <label className="text-sm font-medium">Retype-Password</label>
          <input className="bg-yellow-500 mb-2 p-1 rounded-lg text-sm" />
          <div className="flex justify-center mt-1">
            <input
              type="submit"
              className="bg-green-500 px-2 py-1 rounded-lg border-2 border-black font-bold cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
