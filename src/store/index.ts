import { configureStore } from "@reduxjs/toolkit";

import courseListReducer from "./courseSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    courses: courseListReducer,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;