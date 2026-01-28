import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import Layout from '@/components/common/Layout';
import '@/styles/globals.css';
import { SITE_CONFIG } from '@/lib/constants';
import { ThemeProvider } from '@/contexts/ThemeContext';

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    // Google Analytics page tracking
    useEffect(() => {
        const handleRouteChange = (url) => {
            if (typeof window !== 'undefined' && window.gtag && SITE_CONFIG.gaId) {
                window.gtag('config', SITE_CONFIG.gaId, {
                    page_path: url,
                });
            }
        };

        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    // Use custom layout if page specifies one
    const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

    return (
        <ThemeProvider>
            {getLayout(<Component {...pageProps} />)}
            <Toaster
                position="bottom-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#1e293b',
                        color: '#f1f5f9',
                        border: '1px solid #334155',
                    },
                    success: {
                        iconTheme: {
                            primary: '#22c55e',
                            secondary: '#f1f5f9',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#f1f5f9',
                        },
                    },
                }}
            />
        </ThemeProvider>
    );
}

export default MyApp;