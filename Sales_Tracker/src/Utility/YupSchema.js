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

export function CreateAccountValidation() {
  return yup.object().shape({
    storeName: yup
      .string()
      .required("Store name is required")
      .min(2, "Must be atleast 2 character"),
    storeAddress: yup.string().required("Store address is required"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(/^09\d{9}$/, {
        message: "Invalid phone number",
        excludeEmptyString: true,
      }),
    ownerFirstname: yup
      .string()
      .required("Owner firstname is required")
      .min(2, "Name must be at least 2 character"),
    ownerLastname: yup
      .string()
      .required("Owner lastname is required")
      .min(2, "Name must be at least 2 character"),
    username: yup
      .string()
      .required("Username is required")
      .min(6, "Username must be at least 6 characters"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)",
        }
      ),
    retypePassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
}

export function LoginValidation() {
  return yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(6, "Username must be at least 6 characters"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)",
        }
      ),
  });
}

export function UpdateAccountValidation() {
  return yup.object().shape({
    storeName: yup
      .string()
      .required("Store name is required")
      .min(2, "Must be atleast 2 character"),
    storeAddress: yup.string().required("Store address is required"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(/^09\d{9}$/, {
        message: "Invalid phone number",
        excludeEmptyString: true,
      }),
    ownerFirstname: yup
      .string()
      .required("Owner firstname is required")
      .min(2, "Name must be at least 2 character"),
    ownerLastname: yup
      .string()
      .required("Owner lastname is required")
      .min(2, "Name must be at least 2 character"),
  });
}
