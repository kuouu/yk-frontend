import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  isLogin: boolean;
  id: number;
  username: string;
  email: string;
  image: string;
  enrolledCourses: number[]
}

const initialState: UserState = {
  isLogin: false,
  id: 0,
  username: '',
  email: '',
  image: '',
  enrolledCourses: []
};

export const lessonSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLogin = true;
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.image = action.payload.image;
    },
    clearUser: (state) => {
      state.isLogin = false;
      state.id = 0;
      state.username = '';
      state.email = '';
      state.image = '';
      state.enrolledCourses = [];
    },
    setEnrolledCourses: (state, action) => {
      state.enrolledCourses = action.payload;
    }
  },
});

export default lessonSlice.reducer;
export const { setUser, clearUser, setEnrolledCourses } = lessonSlice.actions;

export const selectIsLogin = (state: { user: UserState }) => state.user.isLogin;