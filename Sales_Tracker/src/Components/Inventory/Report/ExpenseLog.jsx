import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GetItemExpenseReport } from "../../../Utility/APICalls";
import Cookies from "js-cookie";
import ItemExpenseReportCrumbs from "../../BreadCrumbs/ItemExpenseReportCrumbs";

export default function ExpenseLog() {
  const [expenses, setExpenses] = useState([]);
  const location = useLocation();
  const data = location.state;
  useEffect(() => {
    const id = data.id;
    GetItemExpenseReport({ id, setExpenses });
  }, []);

  useEffect(() => {
    if (!Cookies.get("auth_token")) {
      window.location.href = "/";
      return;
    }
  }, []);
  return (
    <div className="flex h-full w-full flex-col p-5">
      <ItemExpenseReportCrumbs itemName={data.itemName} />
      <div className="w-full h-full flex flex-1 justify-center overflow-hidden">
        <div className="w-1/2 h-full py-5 flex flex-col">
          <div className="w-full h-full bg-white rounded-lg flex flex-1 flex-col px-10 overflow-y-auto">
            <div className="flex justify-center text-2xl font-bold">
              {data.itemName} Expense Report
            </div>
            <div className="grid grid-cols-3">
              <div className="font-bold">Quantity</div>
              <div className="font-bold">Cost</div>
              <div className="font-bold">Date</div>
            </div>
            {expenses?.map((expense, index) => {
              return (
                <div className="grid grid-cols-3" key={index}>
                  <div>{expense.quantity}</div>
                  <div>{expense.cost}</div>
                  <div>{expense.expense.date}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
