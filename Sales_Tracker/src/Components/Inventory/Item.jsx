import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import StockInput from "./Form/StockInput";
import BuyingPriceInput from "./Form/BuyingPriceInput";
import SellingPriceInput from "./Form/SellingPriceInput";
import { UpdateItemAPI } from "../../Utility/APICalls";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Item() {
  const location = useLocation();
  const data = location.state;

  const [isItemTheSame, setIsItemTheSame] = useState(true);
  const schema = yup.object().shape({
    stock: yup
      .number()
      .typeError("Invalid number")
      .required("Stock is required")
      .moreThan(0, "Stock should be more than 0"),
    buyingPrice: yup
      .number()
      .typeError("Invalid number")
      .required("Buying price is required")
      .moreThan(0, "Stock should be more than 0"),
    sellingPrice: yup
      .number()
      .typeError("Invalid number")
      .required("Selling price is required")
      .when("buyingPrice", (buyingPrice, schema) => {
        return schema.moreThan(
          buyingPrice,
          "Selling price should be more than the buying price"
        );
      }),
  });

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      stock: data.stock,
      buyingPrice: data.buyingPrice,
      sellingPrice: data.sellingPrice,
    },
  });

  const handleUpdateItem = () => {
    const stock = watch("stock");
    const buyingPrice = watch("buyingPrice");
    const sellingPrice = watch("sellingPrice");
    UpdateItemAPI({ data, stock, buyingPrice, sellingPrice });
  };

  return (
    <div className="flex flex-1 w-full h-full justify-center items-center">
      <form
        onSubmit={handleSubmit(handleUpdateItem)}
        className="w-2/5 h-fit bg-white px-10 py-5 rounded-lg">
        <div className="flex justify-center text-3xl font-bold">
          {data.itemName}
        </div>
        <div className="text-lg font-semibold">Stock</div>
        <StockInput setValue={setValue} watch={watch} schema={schema} />
        <span className="text-red-600">{errors.stock?.message}</span>
        <div className="text-lg font-semibold">Buying Price</div>
        <BuyingPriceInput register={register} />
        <span className="text-red-600">{errors.buyingPrice?.message}</span>
        <div className="text-lg font-semibold">Selling Price</div>
        <SellingPriceInput register={register} />
        <span className="text-red-600">{errors.sellingPrice?.message}</span>
        <div className="flex justify-center mt-5">
          <button
            className={`py-2 px-1 w-1/2 border-2 border-black rounded-lg text-2xl font-bold bg-orange-500`}
            type="submit">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
