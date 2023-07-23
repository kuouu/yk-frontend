import { createSlice } from "@reduxjs/toolkit";

interface TopicState {
  id: string;
  title: string;
  lessons: {
    id: number;
    title: string;
    content: string;
    modified: string;
    duration: string;
    videoId: string;
  }[];
}

const initialState: TopicState = {
  id: '',
  title: '',
  lessons: []
};

export const topicSlice = createSlice({
  name: 'topic',
  initialState,
  reducers: {
    setTopic: (state, action) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.lessons = action.payload.lessons;
    },
    clearTopic: (state) => {
      state.id = '';
      state.title = '';
      state.lessons = [];
    }
  },
});

export default topicSlice.reducer;
export const { setTopic, clearTopic } = topicSlice.actions;

export const selectLessonById = (state: any, lessonId: number) => {
  return state.topic.lessons.find((lesson: any) => lesson.id === lessonId);
}
