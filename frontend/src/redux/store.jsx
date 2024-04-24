import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { userApi } from "./apis/userApi";
import { userReducer } from "./slices/userSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    userApi.middleware,
  ],
  devTools: import.meta.env.DEV,
});

setupListeners(store.dispatch);
