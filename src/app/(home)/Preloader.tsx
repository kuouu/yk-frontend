"use client";

import { useRef } from "react";
import { store } from "@/store";
import { setCourseList } from "@/store/courseSlice";

function Preloader({ courseList }: { courseList: CourseListType[] }) {
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(setCourseList(courseList));
    loaded.current = true;
  }

  return null;
}

export default Preloader;
