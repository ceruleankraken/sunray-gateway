import '@/styles/globals.css'
import React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'

import theme from '@/utils/theme'
import createEmotionCache from '@/utils/createEmotionCache'
import { Box } from '@mui/material'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { store, persistor } from '@/stores/store';
import configs from '@/configs/configs'
import { IS_DEVELOPMENT } from '@/configs/constants';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount      : false,
      refetchOnReconnect  : false,
      retry               : false,
      staleTime           : 5*60*1000,
    },
  },
});

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools
            initialIsOpen={
              IS_DEVELOPMENT && configs.env.reactQueryDevTools ? true : false
            }
          />
          <CacheProvider value={emotionCache}>
            <Head>
              <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Component {...pageProps} />
              </Box>
            </ThemeProvider>
          </CacheProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}