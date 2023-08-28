import React from "react";

export default function Total({ totalExpense }) {
  return (
    <div className="mt-12">
      <div className="flex flex-col-2 items-center ">
        <div className="text-xl font-semibold">Total Expense: </div>
        <div className="text-2xl font-bold">
          {" "}
          ₱ {parseFloat(totalExpense).toFixed(2)}
        </div>
      </div>
    </div>
  );
}
