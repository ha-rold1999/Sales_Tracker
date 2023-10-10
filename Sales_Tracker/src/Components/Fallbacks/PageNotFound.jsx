import React from "react";
import error from "../../assets/error.png";

export default function PageNotFound() {
  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <div className="text-5xl font-extrabold text-white">404</div>
      <div className="text-3xl font-bold">Page Not Found</div>
      <img src={error} alt="error" className="w-1/4" />
    </div>
  );
}
