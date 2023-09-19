import React, { useEffect, useState } from "react";
import {
  GetCurrentDateExpenseReport,
  GetCurrentDateSalesReport,
} from "../../Utility/APICalls";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

export default function DailyReport() {
  const [report, setReport] = useState("today");

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
  } = useQuery(["expenses", year, month, day], () =>
    GetCurrentDateExpenseReport({ store })
  );

  if (isProfitLoading || isExpenseLoading) {
    Swal.showLoading();
  }
  if (isProfitError || isExpenseError) {
    console.log("error");
  }
  if (isProfitSuccess && isExpenseSuccess) {
    console.log(profit);
    localStorage.setItem("storeReport", JSON.stringify(profit.saleReport));
    localStorage.setItem("expenseReport", JSON.stringify(expense));
    Swal.close();
  }

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }

  useEffect(() => {
    if (!Cookies.get("auth_token")) {
      window.location.href = "/";
      Swal.close();
      return;
    }
  }, []);

  return (
    <div className="w-2/5 h-screen bg-white flex flex-1 item-center justify-center flex-col space-y-5">
      <select
        value={report}
        onChange={(e) => setReport(e.target.value)}
        className="w-fit ml-5 px-2 py-1 text-lg rounded-lg font-semibold border-2 border-black bg-orange-500">
        <option value="today">Today</option>
        <option value="week">Week</option>
        <option value="month">Month</option>
        <option value="total">Total</option>
      </select>
      {report === "today" && (
        <div className="space-y-5">
          <div className="flex justify-center text-4xl font-bold">{`${formatDate(
            year + "-" + month + "-" + day
          )}`}</div>
          <div className="flex justify-center text-2xl font-semibold">
            Profit
          </div>
          <div className="flex justify-center">
            <div className="bg-blue-500 px-5  rounded-lg text-2xl">
              ₱{" "}
              {profit
                ? isNaN(profit.saleReport.totalProfit)
                  ? "0.00"
                  : parseFloat(profit.saleReport.totalProfit).toFixed(2)
                : "0.00"}
            </div>
          </div>
          <div className="flex justify-center text-2xl font-semibold">
            Income
          </div>
          <div className="flex justify-center">
            <div className="bg-blue-500 px-5 rounded-lg text-2xl">
              ₱{" "}
              {profit
                ? isNaN(profit.saleReport.totalIncome)
                  ? "0.00"
                  : parseFloat(profit.saleReport.totalIncome).toFixed(2)
                : "0.00"}
            </div>
          </div>
          <div className="flex justify-center text-2xl font-semibold">
            Expense
          </div>
          <div className="flex justify-center">
            <div className="bg-blue-500 px-5 rounded-lg text-2xl">
              ₱{" "}
              {expense
                ? isNaN(expense.totalExpense)
                  ? "0.00"
                  : parseFloat(expense.totalExpense).toFixed(2)
                : "0.00"}
            </div>
          </div>
        </div>
      )}
      {report === "week" && (
        <div className="space-y-5">
          <div className="flex justify-center text-2xl font-bold text-center">{`${formatDate(
            profit.weeklyReport.startDate
          )} to ${formatDate(profit.weeklyReport.endDate)}`}</div>
          <div className="flex justify-center text-2xl font-semibold">
            Profit
          </div>
          <div className="flex justify-center">
            <div className="bg-blue-500 px-5  rounded-lg text-2xl">
              ₱{" "}
              {profit
                ? isNaN(profit.weeklyReport.totalProfit)
                  ? "0.00"
                  : parseFloat(profit.weeklyReport.totalProfit).toFixed(2)
                : "0.00"}
            </div>
          </div>
          <div className="flex justify-center text-2xl font-semibold">
            Income
          </div>
          <div className="flex justify-center">
            <div className="bg-blue-500 px-5 rounded-lg text-2xl">
              ₱{" "}
              {profit
                ? isNaN(profit.weeklyReport.totalIncome)
                  ? "0.00"
                  : parseFloat(profit.weeklyReport.totalIncome).toFixed(2)
                : "0.00"}
            </div>
          </div>
          <div className="flex justify-center text-2xl font-semibold">
            Expense
          </div>
          <div className="flex justify-center">
            <div className="bg-blue-500 px-5 rounded-lg text-2xl">
              ₱{" "}
              {expense
                ? isNaN(expense.totalExpense)
                  ? "0.00"
                  : parseFloat(expense.totalExpense).toFixed(2)
                : "0.00"}
            </div>
          </div>
        </div>
      )}
      {report === "month" && (
        <div className="space-y-5">
          <div className="flex justify-center text-2xl font-bold text-center">{`${formatDate(
            profit.monthlyReport.startDate
          )} to ${formatDate(profit.monthlyReport.endDate)}`}</div>
          <div className="flex justify-center text-2xl font-semibold">
            Profit
          </div>
          <div className="flex justify-center">
            <div className="bg-blue-500 px-5  rounded-lg text-2xl">
              ₱{" "}
              {profit
                ? isNaN(profit.monthlyReport.totalProfit)
                  ? "0.00"
                  : parseFloat(profit.monthlyReport.totalProfit).toFixed(2)
                : "0.00"}
            </div>
          </div>
          <div className="flex justify-center text-2xl font-semibold">
            Income
          </div>
          <div className="flex justify-center">
            <div className="bg-blue-500 px-5 rounded-lg text-2xl">
              ₱{" "}
              {profit
                ? isNaN(profit.monthlyReport.totalIncome)
                  ? "0.00"
                  : parseFloat(profit.monthlyReport.totalIncome).toFixed(2)
                : "0.00"}
            </div>
          </div>
          <div className="flex justify-center text-2xl font-semibold">
            Expense
          </div>
          <div className="flex justify-center">
            <div className="bg-blue-500 px-5 rounded-lg text-2xl">
              ₱{" "}
              {expense
                ? isNaN(expense.totalExpense)
                  ? "0.00"
                  : parseFloat(expense.totalExpense).toFixed(2)
                : "0.00"}
            </div>
          </div>
        </div>
      )}
      {report === "total" && (
        <div className="space-y-5">
          <div className="flex justify-center text-4xl font-bold">Total</div>
          <div className="flex justify-center text-2xl font-semibold">
            Profit
          </div>
          <div className="flex justify-center">
            <div className="bg-blue-500 px-5  rounded-lg text-2xl">
              ₱{" "}
              {profit
                ? isNaN(profit.totalReport.totalProfit)
                  ? "0.00"
                  : parseFloat(profit.totalReport.totalProfit).toFixed(2)
                : "0.00"}
            </div>
          </div>
          <div className="flex justify-center text-2xl font-semibold">
            Income
          </div>
          <div className="flex justify-center">
            <div className="bg-blue-500 px-5 rounded-lg text-2xl">
              ₱{" "}
              {profit
                ? isNaN(profit.totalReport.totalIncome)
                  ? "0.00"
                  : parseFloat(profit.totalReport.totalIncome).toFixed(2)
                : "0.00"}
            </div>
          </div>
          <div className="flex justify-center text-2xl font-semibold">
            Expense
          </div>
          <div className="flex justify-center">
            <div className="bg-blue-500 px-5 rounded-lg text-2xl">
              ₱{" "}
              {expense
                ? isNaN(expense.totalExpense)
                  ? "0.00"
                  : parseFloat(expense.totalExpense).toFixed(2)
                : "0.00"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
