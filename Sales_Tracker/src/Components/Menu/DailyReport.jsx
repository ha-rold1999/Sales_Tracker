import React, { useEffect, useState } from "react";
import {
  GetCurrentDateExpenseReport,
  GetCurrentDateSalesReport,
} from "../../Utility/APICalls";
import { useQuery } from "react-query";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import CurrentDateReport from "./ReportSummary/CurrentDateReport";
import WeekReport from "./ReportSummary/WeekReport";
import MonthReport from "./ReportSummary/MonthReport";
import TotalReport from "./ReportSummary/TotalReport";

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
    localStorage.setItem(
      "expenseReport",
      JSON.stringify(expense.expenseReport)
    );
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
        <CurrentDateReport profit={profit} expense={expense} />
      )}
      {report === "week" && <WeekReport profit={profit} expense={expense} />}
      {report === "month" && <MonthReport profit={profit} expense={expense} />}
      {report === "total" && <TotalReport profit={profit} expense={expense} />}
    </div>
  );
}
