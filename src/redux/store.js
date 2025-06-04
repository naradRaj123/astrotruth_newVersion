import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice"; // Adjust path if different

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
