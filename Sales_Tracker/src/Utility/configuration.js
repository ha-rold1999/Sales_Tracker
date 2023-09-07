import Swal from "sweetalert2";
import { AddItemExpenses } from "./APICalls";

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
  } else if (quantity > selectedItem.value.stock) {
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
      Swal.showLoading();
      await queryClient.fetchQuery("save sales", () => AddSales({ sales }));
      Swal.close();

      await Swal.fire({
        icon: "success",
        title: "Sales saved",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/menu");
    } catch (error) {
      Swal.close();
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
    Swal.showLoading();
    await queryClient.fetchQuery("update item", () =>
      UpdateItemAPI({ data, stock, buyingPrice, sellingPrice })
    );
    Swal.close();

    await Swal.fire({
      icon: "success",
      title: "Item updated",
      showConfirmButton: false,
      timer: 1500,
    });

    navigate("/inventory");
  } catch (error) {
    Swal.close();
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
    Swal.showLoading();
    const item = await queryClient.fetchQuery("add item", () =>
      AddItemCall({ itemName, stock, buyingPrice, sellingPrice })
    );

    const expenses = { item: item, quantity: stock };
    await queryClient.fetchQuery("add expese", () =>
      AddItemExpenses({ expenses })
    );
    Swal.close();

    await Swal.fire({
      icon: "success",
      title: "Item added",
      showConfirmButton: false,
      timer: 1500,
    });

    navigate("/inventory");
  } catch (error) {
    Swal.close();
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "This is on us we are working on it",
    });
  }
}

export function HandleExpenses({
  selectedItem,
  setIsItemSelected,
  quantity,
  setIsSoldGreaterThanZero,
  SetExpense,
  setTotalExpense,
  totalExpense,
  setExpenses,
  expenses,
}) {
  if (quantity <= 0) {
    setIsSoldGreaterThanZero(false);
  } else {
    SetExpense({
      selectedItem,
      setTotalExpense,
      totalExpense,
      quantity,
      expenses,
      setExpenses,
    });
    setIsItemSelected(true);
    setIsSoldGreaterThanZero(true);
  }
}

export async function HandleSaveAllExpenses({
  expenses,
  queryClient,
  AddExpenses,
  navigate,
  setIsExpensesExist,
}) {
  if (expenses.length > 0) {
    try {
      Swal.showLoading();
      await queryClient.fetchQuery("save sales", () =>
        AddExpenses({ expenses })
      );
      Swal.close();

      await Swal.fire({
        icon: "success",
        title: "Expenses saved",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/menu");
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This is on us we are working on it",
      });
    }

    setIsExpensesExist(true);
  } else {
    setIsExpensesExist(false);
  }
}
