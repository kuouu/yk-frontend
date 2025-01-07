'use client'

import { SessionProvider } from 'next-auth/react'
import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'react-redux';
import { store } from '@/store';

type Props = {
  children: React.ReactNode,
}

const Providers = ({ children }: Props) => {
  return (
    <NextUIProvider>
      <SessionProvider>
        <Provider store={store}>
          <main className="dark text-foreground bg-background">
            {children}
          </main>
        </Provider>
      </SessionProvider>
    </NextUIProvider>
  )
}

export default Providers