import React, { useEffect } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
export default function DropBox({
  setSelectedItem,
  selectedItem,
  items,
  isLoading,
}) {
  function handelSelectChange(item) {
    setSelectedItem(item);
  }

  if (isLoading) {
    Swal.showLoading();
  } else {
    Swal.close();
    const opt = items.map((item) => ({
      value: item,
      label: item.itemName,
    }));
    return (
      <Select
        options={opt}
        placeholder="Select item"
        value={selectedItem}
        onChange={handelSelectChange}
        isSearchable={true}
        className="w-full p-2 text-2xl rounded-lg"
      />
    );
  }

  // return (
  //   <select
  //     className="w-full p-2 text-2xl rounded-lg "
  //     onChange={handelSelectChange}
  //     value={selectedItem}>
  //     <option>Select Item</option>
  //     {items?.map((option) => (
  //       <option key={option.id} value={JSON.stringify(option)}>
  //         {option.itemName}
  //       </option>
  //     ))}
  //   </select>
  // );
}
