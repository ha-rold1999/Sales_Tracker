import React from "react";
import { Link } from "react-router-dom";
import { useQueries, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import DropBox from "../Sales/Form/DropBox";
import { useState } from "react";
import Stock from "../Sales/Stock";
import Sold from "../Sales/Form/Sold";
import BoughtItems from "./BoughtItems";
import Total from "./Total";
import {
  HandleExpenses,
  HandleSaveAllExpenses,
} from "../../Utility/configuration";
import { SetExpense } from "../../Utility/SetData";
import { AddExpenses, GetItems } from "../../Utility/APICalls";
import { useQuery } from "react-query";
import ExpenseCrumbs from "../BreadCrumbs/ExpenseCrumbs";

export default function Expenses() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const store = localStorage.getItem("store");
  const { data, isLoading } = useQuery(["items"], () => GetItems({ store }));

  const [selectedItem, setSelectedItem] = useState();
  const [isItemSelected, setIsItemSelected] = useState(true);
  const [isSoldGreaterThanZero, setIsSoldGreaterThanZero] = useState(true);
  const [quantity, setQuantity] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [isExpenseExist, setIsExpensesExist] = useState(true);

  const handelSelectChange = (e) => {
    setSelectedItem(e.target.value);
    setIsItemSelected(true);
  };

  const handleExpense = () => {
    setQuantity(0);
    HandleExpenses({
      selectedItem,
      setIsItemSelected,
      quantity,
      setIsSoldGreaterThanZero,
      SetExpense,
      setTotalExpense,
      totalExpense,
      setExpenses,
      expenses,
    });
  };

  const handleSaveAllExpenses = async () => {
    await HandleSaveAllExpenses({
      expenses,
      queryClient,
      AddExpenses,
      navigate,
      setIsExpensesExist,
    });
  };

  return (
    <div className="flex flex-col-2 h-full">
      <div className="h-full w-2/5 px-10 py-5 flex justify-center items-center flex-col">
        <ExpenseCrumbs />
        <div className="w-full">
          <DropBox
            setSelectedItem={setSelectedItem}
            selectedItem={selectedItem}
            items={data}
            isLoading={isLoading}
          />
          {!selectedItem && (
            <span className="text-red-600">Please select an item</span>
          )}
          <Stock
            selectedItem={selectedItem}
            setIsItemSelected={setIsItemSelected}
          />
          <div className="flex justify-center space-x-2">
            <div className="text-3xl font-semibold">Bought</div>
            <Sold setQuantity={setQuantity} quantity={quantity} />
          </div>
          {!isSoldGreaterThanZero && (
            <span className="text-red-600">Set sold greater than 0</span>
          )}
          <div className="flex justify-center mt-5">
            <button
              className="bg-green-500 w-1/2 py-5 text-xl font-bold border-2 border-black rounded-lg"
              onClick={handleExpense}>
              Add Expense
            </button>
          </div>
          <div className="flex justify-center mt-10">
            <button
              className="bg-orange-500 w-full py-5 text-xl font-bold border-2 border-black rounded-lg"
              onClick={handleSaveAllExpenses}>
              Save All Expense
            </button>
          </div>
          {!isExpenseExist && (
            <span className="text-red-600">There is no sales to save</span>
          )}
          <Total totalExpense={totalExpense} />
        </div>
      </div>
      <BoughtItems
        expenses={expenses}
        setExpenses={setExpenses}
        totalExpense={totalExpense}
        setTotalExpense={setTotalExpense}
      />
    </div>
  );
}
