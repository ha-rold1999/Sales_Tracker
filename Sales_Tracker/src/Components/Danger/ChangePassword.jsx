import React from "react";
import { useForm } from "react-hook-form";
import { UpdatePassword } from "../../Utility/APICalls";
import { UpdatePasswordValidation } from "../../Utility/YupSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import Cookies from "js-cookie";
import ChangePasswordCrumb from "../BreadCrumbs/ChangePasswordCrumb";

export default function ChangePassword() {
  const schema = UpdatePasswordValidation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      newPassword: "",
      retypePassword: "",
    },
  });

  const handleUpdatePassword = () => {
    if (isValid) {
      const account = {
        username: watch("username"),
        password: watch("password"),
        newPassword: watch("newPassword"),
      };
      UpdatePassword({ account });
    }
  };

  useEffect(() => {
    if (!Cookies.get("auth_token")) {
      window.location.href = "/";
      return;
    }
  }, []);
  return (
    <div className="flex w-full h-full flex-col p-5">
      <ChangePasswordCrumb />
      <div className="flex flex-1 justify-center items-center h-full ">
        <form
          className="bg-white w-2/5 h-3/5 rounded-lg border-black border-2 flex flex-col px-5 "
          onSubmit={handleSubmit(handleUpdatePassword)}>
          <div className="text-3xl font-bold justify-center flex">
            Change Password
          </div>
          <label className="text-sm font-medium mt-1">Username</label>
          <input
            className="bg-yellow-500  p-1 rounded-lg text-sm"
            placeholder="Username"
            {...register("username")}
          />
          <span className="text-red-600 text-xs">
            {errors.username?.message}
          </span>

          <label className="text-sm font-medium mt-1">Old Password</label>
          <input
            className="bg-yellow-500  p-1 rounded-lg text-sm"
            {...register("password")}
            type="password"
          />
          <span className="text-red-600 text-xs">
            {errors.password?.message}
          </span>
          <label className="text-sm font-medium mt-1">New Password</label>
          <input
            className="bg-yellow-500  p-1 rounded-lg text-sm"
            {...register("newPassword")}
            type="password"
          />
          <span className="text-red-600 text-xs">
            {errors.password?.message}
          </span>

          <label className="text-sm font-medium mt-1">
            Retype New Password
          </label>
          <input
            className="bg-yellow-500 rounded-lg p-1 text-sm"
            {...register("retypePassword")}
            type="password"
          />
          <span className="text-red-600 text-xs">
            {errors.retypePassword?.message}
          </span>

          <div className="flex justify-center mt-2">
            <input
              type="submit"
              className="bg-green-500 px-2 py-1 rounded-lg border-2 border-black font-bold cursor-pointer"
              value="Save Changes"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
