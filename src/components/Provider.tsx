'use client'

import { SessionProvider } from 'next-auth/react'
import { HeroUIProvider } from '@heroui/react';
import { Provider } from 'react-redux';
import { store } from '@/store';

type Props = {
  children: React.ReactNode,
}

const Providers = ({ children }: Props) => {
  return (
    <HeroUIProvider>
      <SessionProvider>
        <Provider store={store}>
          <main className="dark text-foreground bg-background">
            {children}
          </main>
        </Provider>
      </SessionProvider>
    </HeroUIProvider>
  )
}

export default Providers