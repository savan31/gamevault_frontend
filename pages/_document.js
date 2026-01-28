import { Html, Head, Main, NextScript } from 'next/document';
import { SITE_CONFIG } from '@/lib/constants';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* Preconnect to external domains */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                {/* DNS Prefetch */}
                <link rel="dns-prefetch" href="//www.google-analytics.com" />
                <link rel="dns-prefetch" href="//www.googletagmanager.com" />

                {/* Favicon */}
                <link rel="icon" href="/icons/favicon.ico" />
                <link rel="icon" type="image/svg+xml" href="/icons/logo.svg" />
                <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />

                {/* PWA */}
                <meta name="application-name" content={SITE_CONFIG.name} />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <meta name="apple-mobile-web-app-title" content={SITE_CONFIG.name} />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="msapplication-TileColor" content="#0f172a" />
                <meta name="theme-color" content="#0f172a" />

                {/* Google AdSense */}
                {SITE_CONFIG.adsenseId && (
                    <script
                        async
                        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${SITE_CONFIG.adsenseId}`}
                        crossOrigin="anonymous"
                    />
                )}

                {/* Google Analytics */}
                {SITE_CONFIG.gaId && (
                    <>
                        <script
                            async
                            src={`https://www.googletagmanager.com/gtag/js?id=${SITE_CONFIG.gaId}`}
                        />
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${SITE_CONFIG.gaId}', {
                    page_path: window.location.pathname,
                  });
                `,
                            }}
                        />
                    </>
                )}
            </Head>
            <body>
            <Main />
            <NextScript />
            </body>
        </Html>
    );
}