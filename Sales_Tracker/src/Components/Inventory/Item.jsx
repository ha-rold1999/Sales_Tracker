import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import StockInput from "./Form/StockInput";
import BuyingPriceInput from "./Form/BuyingPriceInput";
import SellingPriceInput from "./Form/SellingPriceInput";
import { DeleteItemCall, UpdateItemAPI } from "../../Utility/APICalls";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { ItemValidation } from "../../Utility/YupSchema";
import { HandleUpdateItem } from "../../Utility/configuration";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

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

  function handleDelete(id) {
    Swal.fire({
      title: "Do you want to DELETE this item?",
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Cancel`,
      confirmButtonColor: "Red",
      denyButtonColor: "Gray",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");

        DeleteItemCall({ id });

        setTimeout(() => {
          window.location.href = "/inventory";
        }, 1000);
      }
    });
  }

  useEffect(() => {
    if (!Cookies.get("auth_token")) {
      window.location.href = "/";
      return;
    }
  }, []);

  return (
    <div className="flex flex-1 w-full h-full justify-center items-center flex-col">
      <div className="flex justify-end w-2/5 mb-1">
        <FontAwesomeIcon
          icon={faTrash}
          className="bg-red-600 p-3 rounded-lg cursor-pointer border-blue-500 border-2 hover:border-black"
          onClick={() => handleDelete(data.id)}
        />
      </div>
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
