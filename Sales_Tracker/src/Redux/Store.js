import { configureStore } from "@reduxjs/toolkit";
import { itemReducer } from "./ItemRedux";

export default configureStore({
  reducer: {
    itemSlice: itemReducer,
  },
});
