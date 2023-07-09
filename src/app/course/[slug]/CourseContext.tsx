'use client'

import React, { createContext, useContext } from "react";

const CourseContext = createContext<CourseType>({} as CourseType);

export const useCourseContext = () => useContext(CourseContext);

type Props = {
  children: React.ReactNode,
  course: CourseType,
}

const CourseContextProvider = ({ children, course }: Props) => {
  return (
    <CourseContext.Provider value={course}>
      {children}
    </CourseContext.Provider>
  )
}

export default CourseContextProvider;