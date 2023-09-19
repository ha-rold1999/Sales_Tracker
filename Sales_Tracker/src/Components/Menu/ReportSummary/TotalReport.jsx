import React from "react";

export default function TotalReport({ profit, expense }) {
  return (
    <div className="space-y-5">
      <div className="flex justify-center text-4xl font-bold">Total</div>
      <div className="flex justify-center text-2xl font-semibold">Profit</div>
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
      <div className="flex justify-center text-2xl font-semibold">Income</div>
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
      <div className="flex justify-center text-2xl font-semibold">Expense</div>
      <div className="flex justify-center">
        <div className="bg-blue-500 px-5 rounded-lg text-2xl">
          ₱{" "}
          {expense
            ? isNaN(expense.totalExpenseReport.totalExpense)
              ? "0.00"
              : parseFloat(expense.totalExpenseReport.totalExpense).toFixed(2)
            : "0.00"}
        </div>
      </div>
    </div>
  );
}
