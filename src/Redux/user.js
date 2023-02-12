import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    singedIn: false,
    email: "",
    id: "",
    role: [],
  },
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    },
  },
});
