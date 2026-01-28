import { useCallback, useEffect, useRef } from 'react';
import { analyticsApi } from '@/lib/api';

export function useAnalytics() {
    const sessionId = useRef(null);

    useEffect(() => {
        // Generate session ID
        if (!sessionId.current) {
            sessionId.current = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        }
    }, []);

    const trackEvent = useCallback(async (gameId, eventType, duration = 0) => {
        try {
            await analyticsApi.track({
                gameId,
                eventType,
                sessionId: sessionId.current,
                duration
            });
        } catch (error) {
            console.error('Failed to track event:', error);
        }
    }, []);

    const trackView = useCallback((gameId) => {
        trackEvent(gameId, 'view');
    }, [trackEvent]);

    const trackPlay = useCallback((gameId) => {
        trackEvent(gameId, 'play');
    }, [trackEvent]);

    const trackPlayEnd = useCallback((gameId, duration) => {
        trackEvent(gameId, 'play_end', duration);
    }, [trackEvent]);

    const trackLike = useCallback((gameId) => {
        trackEvent(gameId, 'like');
    }, [trackEvent]);

    const trackShare = useCallback((gameId) => {
        trackEvent(gameId, 'share');
    }, [trackEvent]);

    return {
        sessionId: sessionId.current,
        trackEvent,
        trackView,
        trackPlay,
        trackPlayEnd,
        trackLike,
        trackShare
    };
}

export function usePageViewTracking() {
    useEffect(() => {
        // Track page view for analytics tools like GA
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'page_view', {
                page_path: window.location.pathname
            });
        }
    }, []);
}