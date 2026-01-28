import { useEffect, useRef } from 'react';
import { SITE_CONFIG } from '@/lib/constants';

export default function AdBanner({
                                     slot = 'default',
                                     format = 'auto',
                                     className = '',
                                     style = {}
                                 }) {
    const adRef = useRef(null);
    const isLoaded = useRef(false);

    useEffect(() => {
        if (!SITE_CONFIG.adsenseId || isLoaded.current) return;

        try {
            if (typeof window !== 'undefined' && window.adsbygoogle) {
                window.adsbygoogle.push({});
                isLoaded.current = true;
            }
        } catch (error) {
            console.error('AdSense error:', error);
        }
    }, []);

    // If no AdSense ID, show placeholder
    if (!SITE_CONFIG.adsenseId) {
        return (
            <div className={`ad-container ${className}`} style={style}>
                <span>Advertisement</span>
            </div>
        );
    }

    return (
        <div className={className} style={style}>
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={{ display: 'block', ...style }}
                data-ad-client={SITE_CONFIG.adsenseId}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive="true"
            />
        </div>
    );
}