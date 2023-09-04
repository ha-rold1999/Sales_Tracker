import React from "react";
import MainMenu from "./MainMenu";
import DailyReport from "./DailyReport";

export default function MainPage() {
  return (
    <div className="w-full h-screen bg-red-500 flex flex-col-2">
      <MainMenu />
      <DailyReport />
    </div>
  );
}
