import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { GetDeletedItems, RetriveItem } from "../../Utility/APICalls";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import ArchiveCrumbs from "../BreadCrumbs/ArchiveCrumbs";

export default function Archive() {
  const store = localStorage.getItem("store");

  const { data } = useQuery(["items"], () => GetDeletedItems({ store }));

  const handleViewItem = (item) => {
    Swal.fire({
      title: "Do you want to restore this item?",
      html: `<span style="font-size: 50px;">${item.itemName}</span>`,
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        RetriveItem(item);
        Swal.fire("Item Restored!", "", "success");

        setTimeout(() => {
          window.location.href = "/archive";
        }, 1000);
      }
    });
  };

  useEffect(() => {
    if (!Cookies.get("auth_token")) {
      window.location.href = "/";
      return;
    }
  }, []);

  return (
    <div className="p-5 space-y-5 flex flex-1 flex-col h-full">
      <ArchiveCrumbs />
      <div className="flex flex-row items-center space-x-5  p-3">
        <div className="text-5xl font-bold text-yellow-300">Deleted Items</div>
      </div>

      <div className="h-full overflow-y-auto hide-scrollbar">
        <div className="grid gap-2 grid-cols-3 ">
          {data?.map((item, index) => {
            return (
              <div
                key={index}
                className={`flex justify-center h-20 items-center rounded-lg bg-red-500`}
                onClick={() => handleViewItem(item)}>
                <div className="text-xl font-bold">{item.itemName}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
