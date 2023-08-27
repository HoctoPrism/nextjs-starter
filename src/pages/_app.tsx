import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import {
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as materialExtendTheme,
  THEME_ID as MATERIAL_THEME_ID
} from "@mui/material/styles";
import '../../styles/App.scss';

import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/material/CssBaseline";
import type {} from "@mui/material/themeCssVarsAugmentation";

import {lightTheme} from "@/utils/theme/lightTheme";
import {darkTheme} from "@/utils/theme/darkTheme";
import ModeToggle from "@/utils/theme/modeToggle";

import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../utils/createEmotionCache";

import Header from "@/components/header";
import Footer from "@/components/footer";
import {Container} from "@mui/joy";
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}

const materialTheme = materialExtendTheme({
  "colorSchemes": {
    "light": lightTheme,
    "dark": darkTheme
  }
});

export default function MyApp(props: MyAppProps) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <MaterialCssVarsProvider defaultMode="system" theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
                <JoyCssVarsProvider defaultMode="system">
                    <CssBaseline />
                    <Header />
                    <Container maxWidth="lg" className='main-container'>
                        <Component {...pageProps} />
                    </Container>
                    <Footer />
                </JoyCssVarsProvider>
            </MaterialCssVarsProvider>
        </CacheProvider>
        );
}
