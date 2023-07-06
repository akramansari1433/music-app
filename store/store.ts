import { configureStore } from "@reduxjs/toolkit";
import songsReducer from "../slices/songsSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      songs: songsReducer,
    },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;