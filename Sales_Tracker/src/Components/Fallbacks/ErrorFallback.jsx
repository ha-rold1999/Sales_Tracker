import React from "react";
import { useState } from "react";

export default function ErrorFallback({ error, resetErrorBoundary }) {
  const [openDetails, setOpenDetails] = useState(true);
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <div className=" w-1/2 h-fit min-h-fit bg-red-500 flex justify-center items-center flex-col rounded-lg space-y-2 p-5 overflow-x-autos">
        <p className="text-white font-bold text-4xl">500 Error</p>
        <pre className="text-white">Something went wrong on rendering</pre>
        <button onClick={() => setOpenDetails(!openDetails)}>
          {openDetails ? "Show less" : "Show more"}
        </button>
        {openDetails && (
          <div className="max-h-40 overflow-y-auto bg-slate-500 p-1 rounded-lg">
            {error.message}
          </div>
        )}
        <button
          onClick={resetErrorBoundary}
          className="bg-yellow-500 px-5 py-1 rounded-lg">
          Try Again
        </button>
      </div>
    </div>
  );
}
