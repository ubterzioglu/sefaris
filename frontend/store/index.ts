import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./api/baseApi";
import authReducer from "./slices/authSlice";
import uiReducer from "./slices/uiSlice";

// Feature endpoint'lerini store'a bağla (injectEndpoints side-effect'leri).
import "./api/authApi";
import "./api/taskApi";
import "./api/projectApi";
import "./api/customerApi";
import "./api/leadApi";
import "./api/financeApi";
import "./api/dashboardApi";
import "./api/documentApi";
import "./api/seoApi";
import "./api/userApi";
import "./api/publicApi";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
