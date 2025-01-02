import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <link
            rel="preload"
            href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600&display=swap"
            as="font"
            type="font/woff2"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600&display=swap"
            rel="stylesheet"
          /> */}
          {/* {process.env.NEXT_PUBLIC_IMAGE_URL && (
            <link
              rel="preconnect"
              href={new URL(process.env.NEXT_PUBLIC_IMAGE_URL).origin}
              crossOrigin="anonymous"
            />
          )} */}
        </Head>
        <body>
          {/* Google Tag Manager (noscript) */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
              <iframe title="no script" src="https://www.googletagmanager.com/ns.html?id=GTM-5PKXXJM2"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
            }}
          />
          {/* <!-- End Google Tag Manager (noscript) --> */}
          <Main />
          <NextScript />

          {/* Google Analytics GA4 */}
          <script
            id="google-tag-manager"
            // strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5PKXXJM2');
          `,
            }}
          />
        </body>
      </Html>
    );
  }
}
