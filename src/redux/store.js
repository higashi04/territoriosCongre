import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import alertReducer from "./err/alertSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
  },
});