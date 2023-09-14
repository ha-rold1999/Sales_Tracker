import React from "react";
import StatisticsCrumbs from "../BreadCrumbs/StatisticsCrumbs";
import StoreStatistics from "./StoreStatistics";
import ItemStatistics from "./ItemStatistics";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function Statistics() {
  useEffect(() => {
    if (!Cookies.get("auth_token")) {
      window.location.href = "/";
      return;
    }
  }, []);
  return (
    <div className="flex bg-blue-600 h-full w-full flex-col p-5 space-y-2">
      <StatisticsCrumbs />
      <StoreStatistics />
      <ItemStatistics />
    </div>
  );
}
