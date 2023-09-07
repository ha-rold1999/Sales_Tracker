import Cookies from "js-cookie";

const SOURCE = "https://localhost:7114";

export function GetItems({ store }) {
  return fetch(`${SOURCE}/api/v1/Item/GetStoreItem/${JSON.parse(store).id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("auth_token")}`,
    },
  }).then((res) => res.json());
}

export function AddItemCall({ itemName, stock, buyingPrice, sellingPrice }) {
  const store = localStorage.getItem("store");
  return fetch(`${SOURCE}/api/v1/Item/AddItem`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("auth_token")}`,
    },
    body: JSON.stringify({
      itemName: itemName,
      stock: stock,
      buyingPrice: buyingPrice,
      sellingPrice: sellingPrice,
      storeInformation: JSON.parse(store),
      isDeleted: false,
    }),
  }).then((res) => res.json());
}

export function DeleteItemCall({ id }) {
  fetch(`${SOURCE}/api/v1/Item/DeleteItem/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("auth_token")}`,
    },
  });
}

export function UpdateItemAPI({ data, stock, buyingPrice, sellingPrice }) {
  const store = localStorage.getItem("store");
  fetch(`${SOURCE}/api/v1/Item/UpdateItem`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("auth_token")}`,
    },
    body: JSON.stringify({
      id: data.id,
      itemName: data.itemName,
      stock: stock,
      buyingPrice: buyingPrice,
      sellingPrice: sellingPrice,
      storeInformation: JSON.parse(store),
      isDeleted: false,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      if (error instanceof SyntaxError) {
        console.error("Invalid JSON format"); // Handle invalid JSON format
      } else {
        console.error("Error: ", error.message); // Log the error message from the server
        console.error("Server Error Message: ", error.message); // Display the server error message
      }
    });
}

export function GetCurrentDateSalesReport({ store }) {
  return fetch(`${SOURCE}/api/Sale/GetCurrentDateSalesReport`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("auth_token")}`,
    },
    body: store,
  }).then((res) => res.json());
}

export async function AddSales({ sales }) {
  try {
    const response = await fetch(`${SOURCE}/api/Sale/Add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth_token")}`,
      },
      body: JSON.stringify(sales), // Send the entire array as the body
    });

    const data = await response.json();
    console.log(data); // Handle the response data as needed
  } catch (error) {
    console.log(error);
  }
}

export function GetItemStockLog({ id, setStock }) {
  fetch(`${SOURCE}/api/Log/item-stock-log/${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      setStock(res);
    });
}

export function GetItemBuyingPriceLog({ id, setBuyingPrice }) {
  fetch(`${SOURCE}/api/Log/item-buyingPrice-log/${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      setBuyingPrice(res);
    });
}

export function GetItemSellingPriceLog({ id, setSellingPrice }) {
  fetch(`${SOURCE}/api/Log/item-sellingPrice-log/${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      setSellingPrice(res);
    });
}

export function GetItemSaleLog({ id, setSales }) {
  fetch(`${SOURCE}/api/Log/item-sales-log/${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      setSales(res);
      console.log(res);
    });
}

export async function AddExpenses({ expenses }) {
  console.log(expenses);
  try {
    const response = await fetch(`${SOURCE}/api/Expense/AddExpense`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("auth_token")}`,
      },
      body: JSON.stringify(expenses), // Send the entire array as the body
    });

    console.log(response);
    const data = await response.json();
    console.log(data); // Handle the response data as needed
  } catch (error) {
    console.log(error);
  }
}

export function GetItemExpenseReport({ id, setExpenses }) {
  fetch(`${SOURCE}/api/Expense/GetItemExpenseReport/${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      setExpenses(res);
      console.log(res);
    })
    .then((err) => console.log(err));
}

export function GetCurrentDateExpenseReport({ store }) {
  return fetch(`${SOURCE}/api/Expense/GetCurrentDateExpenseReport`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("auth_token")}`,
    },
    body: store,
  }).then((res) => res.json());
}

export async function LoginAPI({ username, password, navigate }) {
  console.log(username);
  try {
    const response = await fetch(`${SOURCE}/api/Account/Login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
      // Handle error responses here
      console.error("Login failed:", response.statusText);
      return;
    }

    const res = await response.json();
    const expirationTime = new Date();
    console.log(res);
    expirationTime.setHours(expirationTime.getHours() + 2);
    Cookies.set("auth_token", res.token, { expires: expirationTime });
    localStorage.setItem("store", JSON.stringify(res.storeInformation));
    navigate("/menu");
  } catch (error) {
    // Handle any other errors that may occur during the fetch or navigation
    console.log(error);
  }
}
