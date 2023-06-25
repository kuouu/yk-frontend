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
  theme: {
    borderWeights: {
      normal: '0px',
    }
  }
})

const provider = ({ children, courseList }: Props) => {
  return (
    <NextUIProvider theme={theme}>
      <SessionProvider>
        <AppContext.Provider value={courseList}>
          {children}
        </AppContext.Provider>
      </SessionProvider>
    </NextUIProvider>
  )
}

export default provider