import React from "react";
import { formatDate } from "../../../Utility/configuration";

export default function MonthReport({ profit, expense }) {
  return (
    <div className="space-y-5">
      <div className="flex justify-center text-2xl font-bold text-center">{`${formatDate(
        profit.monthlyReport.startDate
      )} to ${formatDate(profit.monthlyReport.endDate)}`}</div>
      <div className="flex justify-center text-2xl font-semibold">Profit</div>
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
      <div className="flex justify-center text-2xl font-semibold">Income</div>
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
      <div className="flex justify-center text-2xl font-semibold">Expense</div>
      <div className="flex justify-center">
        <div className="bg-blue-500 px-5 rounded-lg text-2xl">
          ₱{" "}
          {expense
            ? isNaN(expense.monthlyReport.totalExpense)
              ? "0.00"
              : parseFloat(expense.monthlyReport.totalExpense).toFixed(2)
            : "0.00"}
        </div>
      </div>
    </div>
  );
}
