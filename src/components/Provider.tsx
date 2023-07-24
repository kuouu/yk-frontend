'use client'

import { SessionProvider } from 'next-auth/react'
import { NextUIProvider, createTheme, useSSR } from '@nextui-org/react';
import { Provider } from 'react-redux';
import { store, persistor } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';

type Props = {
  children: React.ReactNode,
}

const theme = createTheme({
  type: 'dark',
  theme: {
    borderWeights: {
      normal: '0px',
    }
  }
})

const Providers = ({ children }: Props) => {
  const { isBrowser } = useSSR()
  return isBrowser ? (
    <NextUIProvider theme={theme}>
      <SessionProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </SessionProvider>
    </NextUIProvider>
  ) : <></>
}

export default Providers