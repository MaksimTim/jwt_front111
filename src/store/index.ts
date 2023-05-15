import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { useDispatch } from "react-redux";
import authReducer from "./auth/authReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ...(process.env.NODE_ENV !== "production" ? [logger] : [])
    ),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
