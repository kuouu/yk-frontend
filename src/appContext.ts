'use client';

import { createContext, useContext } from "react";

export const AppContext = createContext<CourseListType[]>([])

export const useAppContext = () => useContext(AppContext);
