import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DeleteAccountAPI, UpdateAccountAPI } from "../../Utility/APICalls";
import { UpdateAccountValidation } from "../../Utility/YupSchema";

export default function Account() {
  const [isEdit, setIsEdit] = useState(false);
  const storeInfo = JSON.parse(localStorage.getItem("store"));

  const schema = UpdateAccountValidation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      storeName: storeInfo.storeName,
      storeAddress: storeInfo.storeAddress,
      phoneNumber: storeInfo.phoneNumber,
      ownerFirstname: storeInfo.ownerFirstname,
      ownerLastname: storeInfo.ownerLastname,
    },
  });

  const handleUpdateAccount = () => {
    if (isValid) {
      const account = {
        id: storeInfo.id,
        ownerFirstname: watch("ownerFirstname"),
        ownerLastname: watch("ownerLastname"),
        storeAddress: watch("storeAddress"),
        phoneNumber: watch("phoneNumber"),
        storeName: watch("storeName"),
      };
      UpdateAccountAPI({ account });
    }
  };

  const handleDeleteAccount = () => {
    DeleteAccountAPI();
  };
  return (
    <div className="flex justify-center  h-full w-full py-1">
      <form
        className="h-full w-1/2 bg-white border-black border-2 rounded-lg flex justify-center flex-col px-5 pb-5"
        onSubmit={handleSubmit(handleUpdateAccount)}>
        <div className="text-2xl font-extrabold justify-center flex mb-1">
          Account
        </div>
        {!isEdit && (
          <div
            onClick={() => setIsEdit(true)}
            className="bg-blue-600 cursor-pointer">
            Edit
          </div>
        )}
        {isEdit && (
          <div
            onClick={() => setIsEdit(false)}
            className="bg-red-600 cursor-pointer">
            Cancel Edit
          </div>
        )}
        <div onClick={handleDeleteAccount}>Delete</div>
        <div className="w-full h-full flex-col flex overflow-y-auto">
          <label className="text-sm font-medium">Store Name</label>
          <input
            className={`${
              isEdit ? "bg-yellow-500" : "by-white"
            } p-1 rounded-lg text-sm`}
            placeholder="Store Name"
            disabled={!isEdit}
            {...register("storeName")}
          />
          <span className="text-red-600 text-xs">
            {errors.storeName?.message}
          </span>

          <label className="text-sm font-medium mt-1">Store Address</label>
          <input
            className={`${
              isEdit ? "bg-yellow-500" : "by-white"
            } p-1 rounded-lg text-sm`}
            placeholder="Store Address"
            disabled={!isEdit}
            {...register("storeAddress")}
          />
          <span className="text-red-600 text-xs">
            {errors.storeAddress?.message}
          </span>

          <label className="text-sm font-medium mt-1">Store Phone Number</label>
          <input
            className={`${
              isEdit ? "bg-yellow-500" : "by-white"
            } p-1 rounded-lg text-sm`}
            placeholder="09XXXXXXXXX"
            disabled={!isEdit}
            {...register("phoneNumber")}
          />
          <span className="text-red-600 text-xs">
            {errors.phoneNumber?.message}
          </span>

          <div className="flex flex-col-1 mt-1">
            <div className="flex flex-col w-1/2 mr-1">
              <label className="text-sm font-medium">First Name</label>
              <input
                className={`${
                  isEdit ? "bg-yellow-500" : "by-white"
                } p-1 rounded-lg text-sm`}
                placeholder="Owner First Name"
                disabled={!isEdit}
                {...register("ownerFirstname")}
              />{" "}
              <span className="text-red-600 text-xs">
                {errors.ownerFirstname?.message}
              </span>
            </div>

            <div className="flex flex-col w-1/2">
              <label className="text-sm font-medium">Last Name</label>
              <input
                className={`${
                  isEdit ? "bg-yellow-500" : "by-white"
                } p-1 rounded-lg text-sm`}
                placeholder="Owner Last Name"
                disabled={!isEdit}
                {...register("ownerLastname")}
              />
              <span className="text-red-600 text-xs">
                {errors.ownerLastname?.message}
              </span>
            </div>
          </div>
        </div>
        {isEdit && (
          <div className="flex justify-center mt-2">
            <input
              type="submit"
              className="bg-green-500 px-2 py-1 rounded-lg border-2 border-black font-bold cursor-pointer"
            />
          </div>
        )}
      </form>
    </div>
  );
}
