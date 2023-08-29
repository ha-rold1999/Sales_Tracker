import React from "react";
import { useLocation } from "react-router-dom";
import StockInput from "./Form/StockInput";
import BuyingPriceInput from "./Form/BuyingPriceInput";
import SellingPriceInput from "./Form/SellingPriceInput";
import { UpdateItemAPI } from "../../Utility/APICalls";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { ItemValidation } from "../../Utility/YupSchema";
import { HandleUpdateItem } from "../../Utility/configuration";
import { Link } from "react-router-dom";

export default function Item() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const schema = ItemValidation();

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
    HandleUpdateItem({
      watch,
      queryClient,
      UpdateItemAPI,
      data,
      navigate,
    });
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
        <div className="flex justify-center mt-5">
          <Link
            to="/inventory/item-report"
            state={data}
            className="hover:bg-blue-500 px-2 py-1 rounded-lg cursor-pointer hover:text-white">
            Item Report
          </Link>
          <Link
            to="/inventory/item-sales"
            state={data}
            className="hover:bg-blue-500 px-2 py-1 rounded-lg cursor-pointer hover:text-white">
            Sale Report
          </Link>
          <Link
            to="/inventory/item-expenses"
            state={data}
            className="hover:bg-blue-500 px-2 py-1 rounded-lg cursor-pointer hover:text-white">
            Expense Report
          </Link>
        </div>
      </form>
    </div>
  );
}
