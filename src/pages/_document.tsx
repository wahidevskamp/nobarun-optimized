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
          {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600&display=swap"
            rel="stylesheet"
          /> */}
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
          {/* Lazy Load GA4 */}
          {/* <script
            id="ga4-loader"
            dangerouslySetInnerHTML={{
              __html: `
                document.addEventListener('DOMContentLoaded', function () {
                  var gaScript = document.createElement('script');
                  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX';
                  gaScript.async = true;
                  document.head.appendChild(gaScript);

                  gaScript.onload = function () {
                    window.dataLayer = window.dataLayer || [];
                    function gtag() {
                      window.dataLayer.push(arguments);
                    }
                    gtag('js', new Date());
                    gtag('config', 'G-XXXXXXX');
                  };
                });
              `,
            }}
          /> */}
        </body>
      </Html>
    );
  }
}
