import React, { useEffect } from "react";
import {
  GetCurrentDateExpenseReport,
  GetCurrentDateSalesReport,
} from "../../Utility/APICalls";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function DailyReport() {
  const navigate = useNavigate();

  const currenDate = new Date();
  const year = currenDate.getFullYear();
  const month = currenDate.getMonth() + 1;
  const day = currenDate.getDate();

  const store = localStorage.getItem("store");

  const {
    data: profit,
    isLoading: isProfitLoading,
    isError: isProfitError,
    isSuccess: isProfitSuccess,
  } = useQuery(["sales", year, month, day], () =>
    GetCurrentDateSalesReport({ store })
  );
  const {
    data: expense,
    isLoading: isExpenseLoading,
    isError: isExpenseError,
    isSuccess: isExpenseSuccess,
  } = useQuery(["expenses", year, month, day], GetCurrentDateExpenseReport);

  if (isProfitLoading || isExpenseLoading) {
    Swal.showLoading();
  }
  if (isProfitError || isExpenseError) {
    console.log("error");
  }
  if (isProfitSuccess && isExpenseSuccess) {
    Swal.close();
  }

  useEffect(() => {
    if (!Cookies.get("auth_token")) {
      navigate("/");
      Swal.close();
      return;
    }
  }, []);

  return (
    <div className="w-2/5 h-screen bg-white flex flex-1 item-center justify-center flex-col space-y-5">
      <div className="flex justify-center text-4xl font-bold">{`${month}/${day}/${year}`}</div>
      <div className="flex justify-center text-2xl font-semibold">Profit</div>
      <div className="flex justify-center">
        <div className="bg-blue-500 px-5  rounded-lg text-2xl">
          ₱ {parseFloat(profit?.totalProfit).toFixed(2)}
        </div>
      </div>
      <div className="flex justify-center text-2xl font-semibold">Income</div>
      <div className="flex justify-center">
        <div className="bg-blue-500 px-5 rounded-lg text-2xl">
          ₱ {parseFloat(profit?.totalIncome).toFixed(2)}
        </div>
      </div>
      <div className="flex justify-center text-2xl font-semibold">Expense</div>
      {/* <div className="flex justify-center">
        <div className="bg-blue-500 px-5 rounded-lg text-2xl">
          ₱ {parseFloat(expense?.totalExpense).toFixed(2)}
        </div>
      </div> */}
    </div>
  );
}
