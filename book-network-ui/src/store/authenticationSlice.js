import { createSlice } from "@reduxjs/toolkit";
import {
  saveAuthenticationState,
  loadAuthenticationState,
} from "./LocalStorage";

const initialState = loadAuthenticationState() || {
  authenticationStatus: false,
  fullName: null,
  jwtToken: null,
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state, action) => {
      state.authenticationStatus = true;
      state.fullName = action.payload.fullName;
      state.jwtToken = action.payload.jwtToken;
      saveAuthenticationState(state);
    },
    logout: (state) => {
      state.authenticationStatus = false;
      state.fullName = null;
      state.jwtToken = null;
      saveAuthenticationState(state);
    },
  },
});

export const { login, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
