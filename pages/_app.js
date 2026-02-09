import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import Layout from '@/components/common/Layout';
import '@/styles/globals.css';
import { SITE_CONFIG } from '@/lib/constants';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { PageLoader } from '@/components/common/Loader';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    // Initialize global game lifecycle hooks and H5 Ads hooks
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Game Lifecycle Hooks (required for H5 Games Ads Beta)
        window.gameStart = window.gameStart || (() => {
            console.log('[Game Lifecycle] Game started');
        });

        window.gamePause = window.gamePause || (() => {
            console.log('[Game Lifecycle] Game paused');
        });

        window.gameResume = window.gameResume || (() => {
            console.log('[Game Lifecycle] Game resumed');
        });

        window.gameOver = window.gameOver || ((score) => {
            console.log('[Game Lifecycle] Game over', score ? `Score: ${score}` : '');
        });

        // H5 Ads Integration Hooks (placeholders - ready for Google H5 Games Ads Beta)
        window.showInterstitialAd = window.showInterstitialAd || (() => {
            console.log('[H5 Ads] Interstitial Ad Triggered');
            // This will be replaced with actual Google H5 Games Ads SDK integration
            // Example: google.h5gamesads.showInterstitialAd();
        });

        window.showRewardedAd = window.showRewardedAd || (() => {
            console.log('[H5 Ads] Rewarded Ad Triggered');
            // This will be replaced with actual Google H5 Games Ads SDK integration
            // Example: google.h5gamesads.showRewardedAd();
            return Promise.resolve(true); // Return promise for ad completion
        });
    }, []);

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

    const [isAppLoading, setIsAppLoading] = useState(true);

    useEffect(() => {
        // Simple hydration check
        const timer = setTimeout(() => setIsAppLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <ThemeProvider>
            {isAppLoading && <PageLoader />}
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