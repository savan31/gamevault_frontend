import Head from 'next/head';
import { SITE_CONFIG } from '@/lib/constants';

export default function SEO({
                                title,
                                description,
                                image,
                                url,
                                type = 'website',
                                noindex = false,
                                children
                            }) {
    const fullTitle = title
        ? `${title} | ${SITE_CONFIG.name}`
        : SITE_CONFIG.name;

    const fullDescription = description || SITE_CONFIG.description;
    const fullUrl = url ? `${SITE_CONFIG.url}${url}` : SITE_CONFIG.url;
    const fullImage = image || `${SITE_CONFIG.url}/images/og-default.png`;

    return (
        <Head>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={fullDescription} />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
            <link rel="canonical" href={fullUrl} />

            {/* Robots */}
            {noindex ? (
                <meta name="robots" content="noindex, nofollow" />
            ) : (
                <meta name="robots" content="index, follow" />
            )}

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={fullDescription} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:site_name" content={SITE_CONFIG.name} />
            <meta property="og:locale" content="en_US" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={fullDescription} />
            <meta name="twitter:image" content={fullImage} />

            {/* Favicon */}
            <link rel="icon" href="/icons/favicon.ico" />
            <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />

            {/* Theme Color */}
            <meta name="theme-color" content="#0f172a" />

            {/* Additional tags */}
            {children}
        </Head>
    );
}