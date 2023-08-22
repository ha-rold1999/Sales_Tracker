import * as yup from "yup";

export function ItemValidation() {
  return yup.object().shape({
    stock: yup
      .number()
      .typeError("Invalid number")
      .required("Stock is required")
      .moreThan(0, "Stock should be more than 0"),
    buyingPrice: yup
      .number()
      .typeError("Invalid number")
      .required("Buying price is required")
      .min(1, "Stock should be more than 1"),
    sellingPrice: yup
      .number()
      .typeError("Invalid number")
      .required("Selling price is required")
      .when("buyingPrice", (buyingPrice, schema) => {
        return schema.moreThan(
          buyingPrice,
          "Selling price should be more than the buying price"
        );
      }),
  });
}

export function AddItemValidation() {
  return yup.object().shape({
    itemName: yup.string().required("Item name is required"),
    stock: yup
      .number()
      .typeError("Invalid number")
      .required("Stock is required")
      .moreThan(0, "Stock should be more than 0"),
    buyingPrice: yup
      .number()
      .typeError("Invalid number")
      .required("Buying price is required")
      .min(1, "Stock should be more than 1"),
    sellingPrice: yup
      .number()
      .typeError("Invalid number")
      .required("Selling price is required")
      .when("buyingPrice", (buyingPrice, schema) => {
        return schema.moreThan(
          buyingPrice,
          "Selling price should be more than the buying price"
        );
      }),
  });
}
