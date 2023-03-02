import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    count: 0,
  },
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
      state.count = state.items.length;
      console.log(state);
    },
  },
});

export const { setCartItems } = cartSlice.actions;

export default cartSlice.reducer;
