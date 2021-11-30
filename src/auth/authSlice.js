import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: "",
    isAuthenticated: false,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
});

export const { setAuth, setUser } = authSlice.actions;

export default authSlice.reducer;
