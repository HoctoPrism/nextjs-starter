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
import { ColorContext } from '@/utils/theme/colorContext';

import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../utils/createEmotionCache';
const clientSideEmotionCache = createEmotionCache();
import Cookies from 'js-cookie';
import { parse } from 'cookie';

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  initialTheme: string | PaletteMode;
}

Axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;
Axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default function MyApp({ Component, emotionCache = clientSideEmotionCache, initialTheme, pageProps } : MyAppProps) {

  const [theme, setTheme] = useState(initialTheme);

  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setTheme((prevMode) => prevMode === 'light' ? 'dark' : 'light');
    },
  }), [],
  );

  useEffect(() => {
    Cookies.set('theme', theme, { sameSite: 'lax' });
  }, [theme]);

  const selectedTheme = useMemo(() => createTheme(theme === 'light' ? lightTheme : darkTheme), [theme]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ColorContext.Provider value={colorMode}>
        <ThemeProvider theme={selectedTheme}>
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

/**
 * Retrieves the initial props for the MyApp component.
 *
 * @param {object} context - The context object containing information about the current request.
 * @returns {Promise<object>} - A promise that resolves to an object containing the initial props.
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
MyApp.getInitialProps = async ({ ctx }: object): Promise<object> => {
  // Parse cookies from the request
  const themeCookie = ctx.req ? ctx.req.headers.cookie : '';
  const cookies = themeCookie ? parse(themeCookie) : {};

  // Fallback to 'light' theme if no theme cookie is present
  const initialTheme = cookies.theme || 'light';

  return { initialTheme };
};
