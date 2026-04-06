import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { persistStore, persistReducer } from "redux-persist";
import { useDispatch } from "react-redux";

// Create a custom storage object that falls back to a noop storage when localStorage is not available
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(value: unknown) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

// persite store
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // auth is intentionally excluded - not persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export type AppDispatch = typeof store.dispatch; //app dsipatch type
export const persistor = persistStore(store);
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type IRootState = ReturnType<typeof store.getState>; // store type
