// frontend/components/game/GameGrid.js

import Link from 'next/link';
import GameCard from './GameCard';
import { GameCardSkeleton } from '../common/Loader';

/**
 * GameGrid Component
 * Strictly enforces three states for Google H5 Games Ads review:
 * 1. LOADING: Shows premium shimmering skeletons
 * 2. SUCCESS: Renders actual game cards
 * 3. EMPTY: Shows "No games found" ONLY after loading completes
 */
const GameGrid = ({
    games = [],
    loading = false,
    isLoading = false,
    title,
    showViewAll,
    viewAllHref,
    columns = 6
}) => {
    // Robust loading state calculation
    const isCurrentlyLoading = Boolean(loading || isLoading);
    const gamesArray = Array.isArray(games) ? games : [];

    // State 1: LOADING
    // Never render "No games found" during this state
    if (isCurrentlyLoading && gamesArray.length === 0) {
        return (
            <div className="mb-8">
                {title && (
                    <div className="flex items-center justify-between mb-6">
                        <div className="h-8 w-48 bg-dark-800 rounded-lg animate-pulse" />
                    </div>
                )}
                <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-${columns} gap-4`}>
                    {Array.from({ length: 12 }).map((_, i) => (
                        <GameCardSkeleton key={`skeleton-${i}`} />
                    ))}
                </div>
            </div>
        );
    }

    // State 3: EMPTY (Only if NOT loading AND games array is empty)
    if (!isCurrentlyLoading && gamesArray.length === 0) {
        return (
            <div className="text-center py-20 bg-dark-800/20 rounded-2xl border border-dark-700/50 my-8">
                <div className="text-6xl mb-6">🎮</div>
                <h3 className="text-2xl font-bold text-white mb-2">No Games Available</h3>
                <p className="text-dark-400 max-w-md mx-auto px-4">
                    Our team is currently updating the catalog. Please check back in a few moments.
                </p>
                {viewAllHref && (
                    <Link
                        href="/"
                        className="mt-6 inline-block px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
                    >
                        Browse All Games
                    </Link>
                )}
            </div>
        );
    }

    // State 2: SUCCESS
    return (
        <div className="mb-8">
            {title && (
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        {title}
                    </h2>
                    {showViewAll && viewAllHref && (
                        <Link
                            href={viewAllHref}
                            className="text-primary-400 hover:text-primary-300 text-sm font-semibold flex items-center gap-1 transition-colors"
                        >
                            View All <span className="text-lg">→</span>
                        </Link>
                    )}
                </div>
            )}
            <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-${columns} gap-5`}>
                {gamesArray.map((game) => (
                    <GameCard key={game.id || game.slug} game={game} />
                ))}
            </div>
        </div>
    );
};

export default GameGrid;