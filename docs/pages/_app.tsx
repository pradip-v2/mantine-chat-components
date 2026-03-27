import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantinex/mantine-logo/styles.css';
import '@mantinex/mantine-header/styles.css';
import '@mantinex/demo/styles.css';

import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { CodeHighlightAdapterProvider, createShikiAdapter } from '@mantine/code-highlight';
import { MantineProvider } from '@mantine/core';
import favicon from '../assets/favicon.svg';
import { PACKAGE_DATA } from '../data';
import { theme } from '../theme';

async function loadShiki() {
  const { createHighlighter } = await import('shiki');
  const shiki = await createHighlighter({
    langs: ['tsx', 'scss', 'html', 'bash', 'json'],
    themes: [],
  });

  return shiki;
}

const shikiAdapter = createShikiAdapter(loadShiki);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>{PACKAGE_DATA.packageName}</title>
        <meta name="description" content={PACKAGE_DATA.packageDescription} />
        <meta property="og:title" content={PACKAGE_DATA.packageName} />
        <meta property="og:description" content={PACKAGE_DATA.packageDescription} />
        <meta property="og:url" content={PACKAGE_DATA.documentationUrl} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="canonical" href={PACKAGE_DATA.documentationUrl} />
        <link rel="shortcut icon" href={favicon.src} />
      </Head>
      <CodeHighlightAdapterProvider adapter={shikiAdapter}>
        <Component {...pageProps} />
      </CodeHighlightAdapterProvider>
    </MantineProvider>
  );
}
