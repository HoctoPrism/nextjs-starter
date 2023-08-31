import '../../styles/App.scss';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Axios from 'axios';

import Header from '@/components/header';
import Footer from '@/components/footer';

import { lightTheme } from '@/utils/theme/lightTheme';
import { darkTheme } from '@/utils/theme/darkTheme';

import { Container, CssBaseline, PaletteMode } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ColorContext, setThemeToStorage } from '@/utils/theme/colorContext';

import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../utils/createEmotionCache';
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

Axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default function MyApp(props: MyAppProps) {

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [mode, setMode] = useState<PaletteMode | string | null>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: string | null) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
        setThemeToStorage();
      },
    }),
    [],
  );

  useEffect(() => {
    // rend le thème persistant après reload
    const checkMode = localStorage.getItem('theme');
    if (checkMode) {
      setMode(checkMode);
    }
  }, [mode]);

  const theme = useMemo(() => createTheme(mode === 'light' ? lightTheme : darkTheme), [mode]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ColorContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme>
            <Header />
            <Container maxWidth="lg" className='main-container'>
              <Component {...pageProps} />
            </Container>
            <Footer />
          </CssBaseline>
        </ThemeProvider>
      </ColorContext.Provider>
    </CacheProvider>
  );
}
