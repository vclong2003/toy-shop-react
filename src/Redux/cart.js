import { createSlice } from "@reduxjs/toolkit";

export const cart = createSlice({
  name: "cart",
  initialState: {
    items: [],
    count: 0,
  },
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
      state.count = state.items.length;
    },
  },
});
