import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth-slice";
import { useDispatch, useSelector, useStore } from "react-redux";
import userSlice from "./features/user-slice";
import citySlice from "./features/city-slice";
import categorySlice from "./features/category-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      user: userSlice,
      city: citySlice,
      category: categorySlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
