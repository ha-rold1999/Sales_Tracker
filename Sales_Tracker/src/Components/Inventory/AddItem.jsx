import React, { useEffect } from "react";
import StockInput from "./Form/StockInput";
import BuyingPriceInput from "./Form/BuyingPriceInput";
import SellingPriceInput from "./Form/SellingPriceInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { AddItemValidation } from "../../Utility/YupSchema";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import useAddItemAndExpense from "../../CustomHooks/AddItemHook";

export default function AddItem() {
  const navigate = useNavigate();

  const { handleAddItemAndExpense } = useAddItemAndExpense();

  const schema = AddItemValidation();

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      itemName: "",
      stock: 0,
    },
  });

  const itemName = watch("itemName");
  const stock = watch("stock");
  const buyingPrice = watch("buyingPrice");
  const sellingPrice = watch("sellingPrice");

  const handleClick = async () => {
    handleAddItemAndExpense(
      itemName,
      stock,
      buyingPrice,
      sellingPrice,
      navigate
    );
  };

  useEffect(() => {
    if (!Cookies.get("auth_token")) {
      window.location.href = "/";
      return;
    }
  }, []);

  return (
    <div className="flex w-full h-full p-5 flex-col">
      <div className="space-x-1 flex w-1/2">
        <Link className="w-fit h-fit bg-white px-3 py-1 rounded-lg" to="/menu">
          Menu
        </Link>
        <div className="text-xl text-white">/</div>
        <Link className="w-fit bg-white px-3 py-1 rounded-lg" to="/inventory">
          Inventory
        </Link>
        <div className="text-xl text-white">/</div>
        <Link className="w-fit h-fit bg-yellow-500 px-3 py-1 rounded-lg">
          Add Item
        </Link>
      </div>
      <div className="flex w-full h-full justify-center items-center">
        <form
          onSubmit={handleSubmit(handleClick)}
          className="w-2/5 h-fit bg-white px-10 py-5 rounded-lg">
          <div className="flex justify-center text-3xl font-bold">
            Add New Item
          </div>
          <div className="text-lg font-semibold">Name</div>
          <input
            className="text-xl font-bold w-full bg-yellow-500 py-2 px-1 rounded-lg"
            placeholder="Item Name"
            {...register("itemName")}
          />
          <span className="text-red-600">{errors.itemName?.message}</span>
          <div className="text-lg font-semibold">Stock</div>
          <StockInput
            setValue={setValue}
            watch={watch}
            schema={schema}
            isAdd={false}
          />
          <span className="text-red-600">{errors.stock?.message}</span>
          <div className="text-lg font-semibold">Buying Price</div>
          <BuyingPriceInput register={register} />
          <span className="text-red-600">{errors.buyingPrice?.message}</span>
          <div className="text-lg font-semibold">Selling Price</div>
          <SellingPriceInput register={register} />
          <span className="text-red-600">{errors.sellingPrice?.message}</span>
          <div className="w-full flex justify-center mt-5">
            <button
              className="py-2 px-1 w-1/2 border-2 border-black rounded-lg text-2xl font-bold bg-orange-500"
              type="submit">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
