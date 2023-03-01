import { createSlice } from "@reduxjs/toolkit";

export const cart = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
  },
});
