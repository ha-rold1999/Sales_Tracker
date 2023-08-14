import React from "react";

export default function DailyReport() {
  return (
    <div className="w-2/5 h-screen bg-white flex flex-1 item-center justify-center flex-col space-y-5">
      <div className="flex justify-center text-4xl font-bold">01/01/2023</div>
      <div className="flex justify-center text-2xl font-semibold">Profit</div>
      <div className="flex justify-center">
        <div className="bg-blue-500 px-5 px-3 rounded-lg text-2xl">000.00</div>
      </div>
      <div className="flex justify-center text-2xl font-semibold">Income</div>
      <div className="flex justify-center">
        <div className="bg-blue-500 px-5 px-3 rounded-lg text-2xl">000.00</div>
      </div>
    </div>
  );
}
