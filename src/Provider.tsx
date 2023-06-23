'use client'

import { SessionProvider } from 'next-auth/react'
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { AppContext } from './appContext';

type Props = {
  children: React.ReactNode,
  courseList: CourseListType[]
}

const theme = createTheme({
  type: 'dark',
})

const provider = ({ children, courseList }: Props) => {
  return (
    <NextUIProvider disableBaseline={true} theme={theme}>
      <SessionProvider>
        <AppContext.Provider value={courseList}>
          {children}
        </AppContext.Provider>
      </SessionProvider>
    </NextUIProvider>
  )
}

export default provider