import Cookies from "js-cookie";

const SOURCE = "https://localhost:7114";

export function GetItems() {
  return fetch(`${SOURCE}/api/v1/Item/GetAll`, {
    method: "GET",
  }).then((res) => res.json());
}

export function AddItemCall({ itemName, stock, buyingPrice, sellingPrice }) {
  return fetch(`${SOURCE}/api/v1/Item/Add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      itemName: itemName,
      stock: stock,
      buyingPrice: buyingPrice,
      sellingPrice: sellingPrice,
    }),
  }).then((res) => res.json());
}

export function UpdateItemAPI({ data, stock, buyingPrice, sellingPrice }) {
  fetch(`${SOURCE}/api/v1/Item/Update`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: data.id,
      itemName: data.itemName,
      stock: stock,
      buyingPrice: buyingPrice,
      sellingPrice: sellingPrice,
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

export function GetCurrentDateSalesReport() {
  return fetch(`${SOURCE}/api/Sale/GetCurrentDateSalesReport`, {
    method: "GET",
  }).then((res) => res.json());
}

export async function AddSales({ sales }) {
  try {
    const response = await fetch(`${SOURCE}/api/Sale/Add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
  try {
    const response = await fetch(`${SOURCE}/api/Expense/AddReport`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expenses), // Send the entire array as the body
    });

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

export function GetCurrentDateExpenseReport() {
  return fetch(`${SOURCE}/api/Expense/GetCurrentDateExpenseReport`, {
    method: "GET",
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
    navigate("/menu");
  } catch (error) {
    // Handle any other errors that may occur during the fetch or navigation
    console.log(error);
  }
}
