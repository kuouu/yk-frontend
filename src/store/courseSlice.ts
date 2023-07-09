import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

export interface CourseState {
  courseList: CourseListType[];
}

const courseAdapter = createEntityAdapter<CourseState>();

const initialState: CourseState = courseAdapter.getInitialState({
  courseList: [],
});

export const courseSlice = createSlice({
  name: 'courseList',
  initialState,
  reducers: {
    setCourseList: (state, action) => {
      state.courseList = action.payload;
    }
  }
})

export const { setCourseList } = courseSlice.actions;
export default courseSlice.reducer;

export const courseListSelector = (state: CourseState) => state.courseList;
export const selectCourseById = (state: CourseState, courseId: number) => {
  return state.courseList.find((course) => course.id === courseId);
}