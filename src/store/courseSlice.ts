import { createSlice, createSelector } from "@reduxjs/toolkit";
import { RootState } from ".";

export interface CourseState {
  courseList: CourseListType[];
}

const initialState: CourseState = {
  courseList: [],
};

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

export const courseList = createSelector(
  (state: RootState) => state.courses.courseList,
  list => list
)

export const selectCourseById = (state: CourseState, courseId: number) => {
  return state.courseList.find((course) => course.id === courseId);
}