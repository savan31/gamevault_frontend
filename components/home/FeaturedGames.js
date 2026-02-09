// frontend/components/home/FeaturedGames.js

import Link from 'next/link';
import { FiPlay, FiArrowRight } from 'react-icons/fi';
import { useFeaturedGames } from '@/hooks/useApi';
import { GameCardSkeleton, GameGridSkeleton } from '../common/Loader';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * FeaturedGames Component
 * Implements strict loading state handling for Google Ads Reviewers:
 * - Always shows animated skeletons initially
 * - Only shows game cards after successful fetch
 * - Gracefully hides or shows fallback if empty
 */
export default function FeaturedGames() {
    const { games, isLoading, isError } = useFeaturedGames(6);
    const [renderState, setRenderState] = useState('LOADING'); // LOADING, SUCCESS, EMPTY

    useEffect(() => {
        if (isLoading) {
            setRenderState('LOADING');
        } else if (games && games.length > 0) {
            setRenderState('SUCCESS');
        } else {
            // Even if empty, we provide a silent fallback to avoid blank sections
            setRenderState('EMPTY');
        }
    }, [games, isLoading]);

    // State 1: LOADING -> Show 6 skeletons immediately
    if (renderState === 'LOADING') {
        return (
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="h-8 w-64 bg-dark-800 rounded-lg animate-pulse mb-6" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <GameCardSkeleton key={`featured-skeleton-${i}`} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    // State 3: EMPTY -> Hides section to maintain quality (standard UX)
    if (renderState === 'EMPTY') {
        return null;
    }

    // State 2: SUCCESS -> Render the featured cards
    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="section-title mb-0">⭐ Featured Games</h2>
                    <Link
                        href="/?featured=true"
                        className="text-primary-400 hover:text-primary-300 flex items-center gap-1 font-medium"
                    >
                        View All
                        <FiArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {games.map((game, index) => (
                        <motion.div
                            key={game.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            <Link href={`/game/${game.slug}`} className="block group">
                                <div className="card-hover relative overflow-hidden bg-dark-800 rounded-xl">
                                    <div className="aspect-video relative">
                                        <img
                                            src={game.thumbnail_url}
                                            alt={game.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => {
                                                e.currentTarget.src = `https://placehold.co/600x400/1e293b/ffffff?text=${encodeURIComponent(game.title)}`;
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-80" />

                                        {/* Play button */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/50 transform scale-75 group-hover:scale-100 transition-transform">
                                                <FiPlay className="w-6 h-6 text-white ml-1" />
                                            </div>
                                        </div>

                                        {/* Badge */}
                                        <span className="absolute top-3 left-3 badge bg-yellow-500 text-yellow-900 border-none">
                                            ⭐ Featured
                                        </span>
                                    </div>

                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-white truncate group-hover:text-primary-400 transition-colors">
                                            {game.title}
                                        </h3>
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="text-sm text-dark-400">
                                                {game.category_name || 'Arcade'}
                                            </span>
                                            <span className="text-xs text-dark-500">
                                                {game.plays?.toLocaleString() || 0} plays
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}