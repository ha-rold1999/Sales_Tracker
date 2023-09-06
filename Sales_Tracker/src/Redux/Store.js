import { configureStore } from "@reduxjs/toolkit";
import { itemReducer } from "./ItemRedux";
import { storeReducer } from "./StoreRedux";

export default configureStore({
  reducer: {
    itemSlice: itemReducer,
    storeSlice: storeReducer,
  },
});
