import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    singedIn: false,
  },
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
      console.log(state);
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
