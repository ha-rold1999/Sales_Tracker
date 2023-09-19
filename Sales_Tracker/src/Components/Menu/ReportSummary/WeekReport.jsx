import React from "react";
import { formatDate } from "../../../Utility/configuration";

export default function WeekReport({ profit, expense }) {
  return (
    <div className="space-y-5">
      <div className="flex justify-center text-2xl font-bold text-center">{`${formatDate(
        profit.weeklyReport.startDate
      )} to ${formatDate(profit.weeklyReport.endDate)}`}</div>
      <div className="flex justify-center text-2xl font-semibold">Profit</div>
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
      <div className="flex justify-center text-2xl font-semibold">Income</div>
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
      <div className="flex justify-center text-2xl font-semibold">Expense</div>
      <div className="flex justify-center">
        <div className="bg-blue-500 px-5 rounded-lg text-2xl">
          ₱{" "}
          {expense
            ? isNaN(expense.weeklyReport.totalExpense)
              ? "0.00"
              : parseFloat(expense.weeklyReport.totalExpense).toFixed(2)
            : "0.00"}
        </div>
      </div>
    </div>
  );
}
