import React from "react";
import MainMenu from "./MainMenu";
import DailyReport from "./DailyReport";
import { useDispatch } from "react-redux";
import { setItems } from "../../Redux/ItemRedux";
import { useQuery } from "react-query";
import { GetItems } from "../../Utility/APICalls";

export default function MainPage() {
  const dispatch = useDispatch();
  const { data } = useQuery(["items"], GetItems);
  dispatch(setItems(data));

  return (
    <div className="w-full h-screen bg-red-500 flex flex-col-2">
      <MainMenu />
      <DailyReport />
    </div>
  );
}
