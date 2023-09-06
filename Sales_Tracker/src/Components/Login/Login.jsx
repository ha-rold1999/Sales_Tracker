import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LoginAPI } from "../../Utility/APICalls";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const login = async () => {
    try {
      LoginAPI({ username, password, navigate });
    } catch (error) {
      // Handle any other errors that may occur during the fetch or navigation
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center  h-full w-full py-10">
      <div className="h-full w-1/3 bg-white border-black border-2 rounded-lg flex justify-center flex-col px-5 pb-5">
        <div className="text-3xl font-extrabold justify-center flex mb-3">
          Login
        </div>
        <div className="w-full h-full flex-col flex">
          <label className="text-lg font-medium">Username</label>
          <input
            className="bg-yellow-500 mb-4 p-1 rounded-lg"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="text-lg font-medium">Password</label>
          <input
            className="bg-yellow-500 mb-4 p-1 rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-center mt-10">
            <input
              type="submit"
              className="bg-green-500 px-10 py-3 rounded-lg border-2 border-black font-bold cursor-pointer"
              onClick={login}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Link to="/register">Create Account</Link>
        </div>
      </div>
    </div>
  );
}
