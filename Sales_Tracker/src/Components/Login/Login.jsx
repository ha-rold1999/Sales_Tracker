import React from "react";

export default function Login() {
  return (
    <div className="flex justify-center  h-full w-full py-10">
      <div className="h-full w-1/3 bg-white border-black border-2 rounded-lg flex justify-center flex-col px-5 pb-5">
        <div className="text-3xl font-extrabold justify-center flex mb-3">
          Login
        </div>
        <form className="w-full h-full flex-col flex">
          <label className="text-lg font-medium">Username</label>
          <input className="bg-yellow-500 mb-4 p-1 rounded-lg" />
          <label className="text-lg font-medium">Password</label>
          <input className="bg-yellow-500 mb-4 p-1 rounded-lg" />
          <div className="flex justify-center mt-10">
            <input
              type="submit"
              className="bg-green-500 px-10 py-3 rounded-lg border-2 border-black font-bold cursor-pointer"
            />
          </div>
        </form>
        <div className="flex justify-center">Create Account</div>
      </div>
    </div>
  );
}
