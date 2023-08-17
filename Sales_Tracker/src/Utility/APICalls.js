const SOURCE = "https://localhost:7114";

export function GetItems({ setItems }) {
  fetch(`${SOURCE}/api/v1/Item/GetAll`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      setItems(data); // Update state with fetched items
    })
    .catch((error) => {
      console.log(error);
    });
}

export function AddItemCall({ itemName, stock, buyingPrice, sellingPrice }) {
  fetch(`${SOURCE}/api/v1/Item/Add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      itemName: itemName,
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
