import React from "react";
import { CreateAccountAPI } from "../../Utility/APICalls";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateAccountValidation } from "../../Utility/YupSchema";

export default function Register() {
  const schema = CreateAccountValidation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      storeName: "",
      storeAddress: "",
      phoneNumber: "",
      ownerFirstname: "",
      ownerLastname: "",
      username: "",
      password: "",
      retypePassword: "",
    },
  });

  const handleCreateAccount = () => {
    const account = {
      ownerFirstname: watch("ownerFirstname"),
      ownerLastname: watch("ownerLastname"),
      storeAddress: watch("storeAddress"),
      phoneNumber: watch("phoneNumber"),
      storeName: watch("storeName"),
      storeCredentials: {
        username: watch("username"),
        password: watch("password"),
      },
    };
    CreateAccountAPI({ account });
  };

  return (
    <div className="flex justify-center  h-full w-full py-1">
      <form
        className="h-full w-1/2 bg-white border-black border-2 rounded-lg flex justify-center flex-col px-5 pb-5"
        onSubmit={handleSubmit(handleCreateAccount)}>
        <div className="text-2xl font-extrabold justify-center flex mb-1">
          Register
        </div>
        <div className="w-full h-full flex-col flex overflow-y-auto">
          <label className="text-sm font-medium">Store Name</label>
          <input
            className="bg-yellow-500 mb-2 p-1 rounded-lg text-sm"
            placeholder="Store Name"
            {...register("storeName")}
          />
          <span className="text-red-600">{errors.storeName?.message}</span>

          <label className="text-sm font-medium">Store Address</label>
          <input
            className="bg-yellow-500 mb-2 p-1 rounded-lg text-sm"
            placeholder="Store Address"
            {...register("storeAddress")}
          />
          <span className="text-red-600">{errors.storeAddress?.message}</span>

          <label className="text-sm font-medium">Store Phone Number</label>
          <input
            className="bg-yellow-500 mb-2 p-1 rounded-lg text-sm"
            placeholder="09XXXXXXXXX"
            {...register("phoneNumber")}
          />
          <span className="text-red-600">{errors.phoneNumber?.message}</span>

          <div className="flex flex-col-1">
            <div className="flex flex-col w-1/2 mr-1">
              <label className="text-sm font-medium">First Name</label>
              <input
                className="bg-yellow-500 mb-2 p-1 rounded-lg text-sm"
                placeholder="Owner First Name"
                {...register("ownerFirstname")}
              />{" "}
              <span className="text-red-600">
                {errors.ownerFirstname?.message}
              </span>
            </div>

            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium">Last Name</label>
              <input
                className="bg-yellow-500 mb-2 p-1 rounded-lg text-sm"
                placeholder="Owner Last Name"
                {...register("ownerLastname")}
              />
              <span className="text-red-600">
                {errors.ownerLastname?.message}
              </span>
            </div>
          </div>

          <label className="text-sm font-medium">Username</label>
          <input
            className="bg-yellow-500 mb-2 p-1 rounded-lg text-sm"
            placeholder="Username"
            {...register("username")}
          />
          <span className="text-red-600">{errors.username?.message}</span>

          <label className="text-sm font-medium">Password</label>
          <input
            className="bg-yellow-500 mb-2 p-1 rounded-lg text-sm"
            {...register("password")}
          />
          <span className="text-red-600">{errors.password?.message}</span>

          <label className="text-sm font-medium">Retype-Password</label>
          <input
            className="bg-yellow-500 mb-2 p-1 rounded-lg text-sm"
            {...register("retypePassword")}
          />
          <span className="text-red-600">{errors.retypePassword?.message}</span>

          <div className="flex justify-center mt-1">
            <input
              type="submit"
              className="bg-green-500 px-2 py-1 rounded-lg border-2 border-black font-bold cursor-pointer"
              onClick={handleCreateAccount}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
