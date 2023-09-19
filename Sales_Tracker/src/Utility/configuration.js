import Swal from "sweetalert2";
import {
  AddItemExpenses,
  DeleteItemCall,
  CheckAuthorization,
} from "./APICalls";

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
    selectedItem.value.stock -= quantity;
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
  const itemName = watch("itemName");
  const stock = watch("stock");
  const buyingPrice = watch("buyingPrice");
  const sellingPrice = watch("sellingPrice");

  try {
    Swal.showLoading();
    await queryClient.fetchQuery("update item", () =>
      UpdateItemAPI({ data, itemName, stock, buyingPrice, sellingPrice })
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
      await queryClient.fetchQuery("save expenses", () =>
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

export function HandleDeleteItem({ id }) {
  Swal.fire({
    title: "Do you want to ARCHIVE this item?",
    showDenyButton: true,
    confirmButtonText: "Archive",
    denyButtonText: `Cancel`,
    confirmButtonColor: "Red",
    denyButtonColor: "Gray",
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("", "", "success");

      DeleteItemCall({ id });

      setTimeout(() => {
        window.location.href = "/inventory";
      }, 1000);
    }
  });
}

export function HandeDeleteAccount() {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title:
          "To confirm delete account please enter your username and password",
        html:
          '<input type="text" id="text" class="swal2-input" placeholder="Enter Usernamne">' +
          '<input type="password" id="password" class="swal2-input" autocapitalize="off" placeholder="Enter your password">',
        showCancelButton: true,
        confirmButtonText: "Look up",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          const login = {
            username: document.getElementById("text").value,
            password: document.getElementById("password").value,
          };
          CheckAuthorization({ login });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
    }
  });
}

export function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
}
