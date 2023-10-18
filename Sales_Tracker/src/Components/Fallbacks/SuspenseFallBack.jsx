import React from "react";

export default function SuspenseFallBack() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="bg-white w-1/2 h-1/3 justify-center items-center flex rounded-lg">
        <div className="font-bold text-2xl">Component Rendering...</div>
      </div>
    </div>
  );
}
