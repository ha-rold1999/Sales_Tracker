import Swal from "sweetalert2";

export function HandleSales({
  selectedItem,
  setIsItemSelected,
  quantity,
  setIsSoldGreaterThanZero,
  setIsSoldLessThanStock,
  SetSales,
  setTootalProfit,
  totalProfit,
  setTotalIncome,
  totalIncome,
  setSales,
  sales,
}) {
  if (typeof selectedItem === "undefined") {
    setIsItemSelected(false);
  } else if (quantity <= 0) {
    setIsSoldGreaterThanZero(false);
    setIsSoldLessThanStock(true);
  } else if (quantity > JSON.parse(selectedItem).stock) {
    setIsSoldLessThanStock(false);
    setIsSoldGreaterThanZero(true);
  } else {
    SetSales({
      selectedItem,
      setTootalProfit,
      totalProfit,
      setTotalIncome,
      totalIncome,
      quantity,
      setSales,
      sales,
    });
    setIsItemSelected(true);
    setIsSoldGreaterThanZero(true);
    setIsSoldLessThanStock(true);
  }
}

export async function HandleSaveAllSales({
  sales,
  queryClient,
  AddSales,
  navigate,
  setIsSalesExist,
}) {
  if (sales.length > 0) {
    try {
      await queryClient.fetchQuery("save sales", () => AddSales({ sales }));

      await Swal.fire({
        icon: "success",
        title: "Sales saved",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This is on us we are working on it",
      });
    }

    setIsSalesExist(true);
  } else {
    setIsSalesExist(false);
  }
}

export function LoadItem({ isLoading, isError, isSuccess }) {
  if (isLoading) {
    Swal.showLoading();
  }
  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "This is on us we are working on it",
    });
  }

  if (isSuccess) {
    Swal.close();
  }
}

export async function HandleUpdateItem({
  watch,
  queryClient,
  UpdateItemAPI,
  data,
  navigate,
}) {
  const stock = watch("stock");
  const buyingPrice = watch("buyingPrice");
  const sellingPrice = watch("sellingPrice");

  try {
    await queryClient.fetchQuery("update item", () =>
      UpdateItemAPI({ data, stock, buyingPrice, sellingPrice })
    );

    await Swal.fire({
      icon: "success",
      title: "Item updated",
      showConfirmButton: false,
      timer: 1500,
    });

    navigate("/inventory");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "This is on us we are working on it",
    });
  }
}

export async function HandleAddItem({
  queryClient,
  AddItemCall,
  itemName,
  stock,
  buyingPrice,
  sellingPrice,
  navigate,
}) {
  try {
    await queryClient.fetchQuery("add item", () =>
      AddItemCall({ itemName, stock, buyingPrice, sellingPrice })
    );

    await Swal.fire({
      icon: "success",
      title: "Item added",
      showConfirmButton: false,
      timer: 1500,
    });

    navigate("/inventory");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "This is on us we are working on it",
    });
  }
}