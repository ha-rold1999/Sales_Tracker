import { createSlice } from "@reduxjs/toolkit";

const storeSlice = createSlice({
  name: "store",
  initialState: { store: {} },
  reducers: {
    setStore: (state, action) => {
      state.store = action.payload;
    },
  },
});

export const { setStore } = storeSlice.actions;
export const storeReducer = storeSlice.reducer;
