// pages/_document.tsx
import Document, { DocumentContext, DocumentInitialProps, DocumentProps, Head, Html, Main, NextScript } from 'next/document';
import { AppType } from 'next/app';
import { MyAppProps } from './_app';
import createEmotionCache from '../utils/createEmotionCache';
import createEmotionServer, { EmotionCriticalToChunks } from '@emotion/server/create-instance';
import React, { Key } from 'react';

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[];
}

export default function MyDocument({ emotionStyleTags }: MyDocumentProps) {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico"/>
        {/* Insertion point for client. This connects with createEmotionCache.ts */}
        <meta name="emotion-insertion-point" content=""/>
        {/*                <meta name="theme-color" content={darkTheme.palette.primary.main} />*/}
        {emotionStyleTags}
      </Head>
      <body>
        <Main/>
        <NextScript/>
      </body>
    </Html>
  );
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
function setupEmotionCache(ctx: DocumentContext) {
  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same Emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  // We're passing `emotionCache` to App component
  ctx.renderPage = () =>
    originalRenderPage({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      enhanceApp: (
        App: React.ComponentType<React.ComponentProps<AppType> & MyAppProps>,
      ) =>
        function EnhanceApp(props) {
          return <App initialTheme={''} emotionCache={cache} {...props} />;
        },
    });
  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  return extractCriticalToChunks;
}

function createEmotionStyleTags(
  initialProps: DocumentInitialProps,
  extractCriticalToChunks: { (html: string): EmotionCriticalToChunks; (arg0: never): EmotionCriticalToChunks; },
) {
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  return emotionStyles.styles.map((style: { key: Key | null | undefined; ids: string[]; css: string; }) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const extractCriticalToChunks = setupEmotionCache(ctx);
  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    emotionStyleTags: createEmotionStyleTags(initialProps, extractCriticalToChunks),
  };
};
