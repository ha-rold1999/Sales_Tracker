import React from "react";
import { formatDate } from "../../../Utility/configuration";

export default function CurrentDateReport({ profit, expense }) {
  const currenDate = new Date();
  const year = currenDate.getFullYear();
  const month = currenDate.getMonth() + 1;
  const day = currenDate.getDate();
  return (
    <div className="space-y-5">
      <div className="flex justify-center text-4xl font-bold">{`${formatDate(
        year + "-" + month + "-" + day
      )}`}</div>
      <div className="flex justify-center text-2xl font-semibold">Profit</div>
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
      <div className="flex justify-center text-2xl font-semibold">Income</div>
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
      <div className="flex justify-center text-2xl font-semibold">Expense</div>
      <div className="flex justify-center">
        <div className="bg-blue-500 px-5 rounded-lg text-2xl">
          ₱{" "}
          {expense
            ? isNaN(expense.expenseReport.totalExpense)
              ? "0.00"
              : parseFloat(expense.expenseReport.totalExpense).toFixed(2)
            : "0.00"}
        </div>
      </div>
    </div>
  );
}
