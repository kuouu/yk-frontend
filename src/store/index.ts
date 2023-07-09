import { configureStore } from "@reduxjs/toolkit";

import courseListReducer from "./courseSlice";

export const store = configureStore({
  reducer: {
    server: courseListReducer,
    // client: clientDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;