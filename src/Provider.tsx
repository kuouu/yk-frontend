'use client'

import { SessionProvider } from 'next-auth/react'
import { NextUIProvider, createTheme } from '@nextui-org/react';

type Props = {
  children: React.ReactNode
}

const theme = createTheme({
  type: 'dark',
})

const provider = ({ children }: Props) => {
  return (
    <NextUIProvider disableBaseline={true} theme={theme}>
      <SessionProvider>
        {children}
      </SessionProvider>
    </NextUIProvider>
  )
}

export default provider