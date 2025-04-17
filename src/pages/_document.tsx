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
          {/* Preconnect to Google Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />

          {/* Preload the font */}
          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600&display=swap"
          />

          {/* Defer loading of the stylesheet */}
          <link
            href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600&display=swap"
            rel="stylesheet"
            media="print"
            // onLoad="this.media='all'"
          />

          {/* Fallback for users with JavaScript disabled */}
          <noscript>
            <link
              href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600&display=swap"
              rel="stylesheet"
            />
          </noscript>
        </Head>
        <body>
          {/* google tag manager was here */}
          <Main />
          <NextScript />

          {/* Google Analytics GA4 */}
          {/* Lazy Load GA4 */}
          <script
            id="ga4-loader"
            dangerouslySetInnerHTML={{
              __html: `
                document.addEventListener('DOMContentLoaded', function () {
                  var gaScript = document.createElement('script');
                  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=GTM-WXL5GDL';
                  gaScript.async = true;
                  document.head.appendChild(gaScript);

                  gaScript.onload = function () {
                    window.dataLayer = window.dataLayer || [];
                    function gtag() {
                      window.dataLayer.push(arguments);
                    }
                    gtag('js', new Date());
                    gtag('config', 'GTM-WXL5GDL');
                  };
                });
              `,
            }}
          />

          {/* Google Tag Manager (noscript) */}
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
              <iframe title="no script" src="https://www.googletagmanager.com/ns.html?id=GTM-WXL5GDL"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
            }}
          />
          {/* <!-- End Google Tag Manager (noscript) --> */}
        </body>
      </Html>
    );
  }
}
