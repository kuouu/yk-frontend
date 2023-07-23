import { configureStore } from "@reduxjs/toolkit";

import courseListReducer from "./courseSlice";
import userSlice from "./userSlice";
import topicSlice from "./topicSlice";

export const store = configureStore({
  reducer: {
    courses: courseListReducer,
    user: userSlice,
    topic: topicSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;