import 'lazysizes';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Fragment, useEffect } from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ThemeProvider } from 'styled-components';
import '../styles/main.scss';
import { GlobalStyles } from '../utils/globalStyles';
import { theme } from '../utils/theme';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

NProgress.configure({ showSpinner: false });

const App = ({ Component, pageProps }: any) => {
  let Layout = Component.layout || Fragment;
  useEffect(() => {
    document.addEventListener(
      'contextmenu',
      (event) =>
        process.env.NODE_ENV === 'production' && event.preventDefault(),
    );
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <link
          rel="preload"
          as="image"
          href="/assets/images/banners/mobile/1-Bakery-Equipment-nobarun.webp"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Nobarun International</title>
        {/*<meta name="robots" content="index" />*/}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="apple-mobile-web-app-title" content="nobarun" />
        <meta name="application-name" content="nobarun" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content="Supplier of Electronic Safety Security Items, Parking Equipment, Super Shop Equipment,
          Slaughterhouse Equipment & Commercial Kitchen Equipment in Bangladesh"
        />
        <meta
          name="keywords"
          content="Supplier of Electronic Safety Security Items,
        Parking Equipment, Super Shop Equipment,
        Slaughterhouse Equipment & Commercial Kitchen Equipment in Bangladesh"
        />
        {/* SOCIAL META TAGS */}
        <meta property="og:url" content="/cover.jpeg" />
        {/* thumbnail And title for social media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Nobarun International" />

        {/* preload */}
        <link
          rel="preload"
          href="/assets/images/banners/1-Bakery-Equipment-nobarun.webp"
          as="image"
        />
        <link
          rel="preload"
          href="/assets/images/banners/2-Slaughterhouse-Equipment-4.webp"
          as="image"
        />
        <link
          rel="preload"
          href="/assets/images/banners/3-Supermarket-Equipment-with-logo.webp"
          as="image"
        />
        <link
          rel="preload"
          href="/assets/images/banners/4-Slaughterhouse-Equipment.webp"
          as="image"
        />
        <link
          rel="preload"
          href="/assets/images/banners/5-Metal-Detector-&-Scanning-System.webp"
          as="image"
        />
        <link
          rel="preload"
          href="/assets/images/banners/6-Slaughterhouse-Equipment-nobarun.webp"
          as="image"
        />

        <script
          defer={true}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Corporation',
              name: 'Nobarun International',
              url: 'https://www.nobarunbd.com/',
              logo: 'https://www.nobarunbd.com/assets/images/logo.svg',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '01711998626',
                contactType: 'customer service',
                areaServed: 'BD',
                availableLanguage: 'Bengali',
              },
              sameAs: [
                'https://www.facebook.com/nobaruninternational',
                'https://twitter.com/nobarunbd',
                'https://www.youtube.com/c/NobarunInternational/videos',
                'https://www.pinterest.com/nobaruninternational/',
              ],
            }),
          }}
        />
      </Head>
      <GlobalStyles />
      <Layout
        count={pageProps?.count || 0}
        categories={pageProps?.categories || []}
      >
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
