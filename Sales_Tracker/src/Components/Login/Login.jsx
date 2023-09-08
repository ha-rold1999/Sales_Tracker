import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LoginAPI } from "../../Utility/APICalls";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidation } from "../../Utility/YupSchema";

export default function Login() {
  const navigate = useNavigate();

  const schema = LoginValidation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { username: "", password: "" },
  });

  const login = async () => {
    try {
      LoginAPI({
        username: watch("username"),
        password: watch("password"),
        navigate,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center  h-full w-full py-10">
      <div className="h-full w-1/3 bg-white border-black border-2 rounded-lg flex justify-center flex-col px-5 pb-5">
        <div className="text-3xl font-extrabold justify-center flex mb-3">
          Login
        </div>
        <form
          className="w-full h-full flex-col flex"
          onSubmit={handleSubmit(login)}>
          <label className="text-lg font-medium">Username</label>
          <input
            className="bg-yellow-500 p-1 rounded-lg"
            placeholder="Username"
            {...register("username")}
          />
          <span className="text-red-600 text-xs">
            {errors.username?.message}
          </span>

          <label className="text-lg font-medium mt-4">Password</label>
          <input
            type="password"
            className="bg-yellow-500 p-1 rounded-lg"
            {...register("password")}
          />
          <span className="text-red-600 text-xs">
            {errors.password?.message}
          </span>

          <div className="flex justify-center mt-10">
            <input
              type="submit"
              className="bg-green-500 px-10 py-3 rounded-lg border-2 border-black font-bold cursor-pointer"
            />
          </div>
        </form>
        <div className="flex justify-center">
          <Link to="/register">Create Account</Link>
        </div>
      </div>
    </div>
  );
}
