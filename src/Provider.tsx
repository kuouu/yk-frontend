'use client'

import { SessionProvider } from 'next-auth/react'
import { NextUIProvider, createTheme, useSSR } from '@nextui-org/react';
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

const Provider = ({ children, courseList }: Props) => {
  const { isBrowser } = useSSR()
  return isBrowser ? (
      <NextUIProvider theme={theme}>
        <SessionProvider>
          <AppContext.Provider value={courseList}>
            {children}
          </AppContext.Provider>
        </SessionProvider>
      </NextUIProvider>
  ) : <></>
}

export default Provider