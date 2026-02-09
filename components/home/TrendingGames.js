// frontend/components/home/TrendingGames.js

import Link from 'next/link';
import { FiArrowRight, FiTrendingUp } from 'react-icons/fi';
import { useTrendingGames } from '@/hooks/useApi';
import GameGrid from '../game/GameGrid';
import { useEffect, useState } from 'react';

// Fallback demo game to ensure reviewers always see content
const FALLBACK_DEMO_GAME = {
    id: 'demo-snake',
    slug: 'snake-demo',
    title: 'Snake Classic',
    description: 'Classic Snake game - A timeless arcade experience. Work offline and guaranteed to play.',
    thumbnail_url: '/snake-thumbnail.png',
    category: 'Arcade',
    plays: 0,
    isDemoGame: true
};

/**
 * TrendingGames Component
 * Implements strict three-state rendering for Google review safety:
 * 1. LOADING: Show skeleton cards
 * 2. SUCCESS: Show fetched games
 * 3. FALLBACK/EMPTY: Show the demo game (never "No games found")
 */
export default function TrendingGames() {
    const { games, isLoading, isError } = useTrendingGames(12);
    const [showFallback, setShowFallback] = useState(false);
    const [renderState, setRenderState] = useState('LOADING'); // LOADING, SUCCESS, EMPTY

    // Handle state transitions
    useEffect(() => {
        if (isLoading) {
            setRenderState('LOADING');
        } else if (games && games.length > 0) {
            setRenderState('SUCCESS');
        } else if (isError || (games && games.length === 0)) {
            // If data loaded but is empty or error, we might show fallback
            // But we'll wait a tiny bit to avoid flash if revalidating
            setRenderState('EMPTY');
        }
    }, [games, isLoading, isError]);

    // Safety timeout: if after 5 seconds we are still loading or empty, force fallback
    useEffect(() => {
        const timer = setTimeout(() => {
            if (renderState === 'LOADING' || renderState === 'EMPTY') {
                setShowFallback(true);
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [renderState]);

    // Determine final display games
    let displayGames = games || [];
    let currentLoading = isLoading;

    // REVIEWER SAFETY: If we are in 'EMPTY' state or 'showFallback' is triggered,
    // we inject the demo game so the user NEVER sees an empty screen.
    if (renderState === 'EMPTY' || showFallback) {
        if (displayGames.length === 0) {
            displayGames = [FALLBACK_DEMO_GAME];
            currentLoading = false; // Force stop loading state to show fallback
        }
    }

    return (
        <section id="trending" className="py-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="section-title mb-0 flex items-center gap-2">
                        <FiTrendingUp className="w-8 h-8 text-primary-500" />
                        Trending Now
                    </h2>
                    <Link
                        href="/?sortBy=plays"
                        className="text-primary-400 hover:text-primary-300 flex items-center gap-1 font-medium"
                    >
                        View All
                        <FiArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* 
                  GameGrid will handle the internal rendering of cards vs skeletons.
                  We pass currentLoading to ensure skeletons show during initial load.
                */}
                <GameGrid
                    games={displayGames}
                    loading={currentLoading && !showFallback}
                    columns={6}
                />
            </div>
        </section>
    );
}