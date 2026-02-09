// frontend/components/game/GameGrid.js

import Link from 'next/link';
import GameCard from './GameCard';

// Professional animated skeleton card
export const GameCardSkeleton = () => (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700/50">
        <div className="aspect-[4/3] bg-gray-700 animate-pulse" />
        <div className="p-3 space-y-3">
            <div className="h-4 w-3/4 bg-gray-700 rounded animate-pulse" />
            <div className="flex items-center justify-between">
                <div className="h-3 w-1/3 bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-4 bg-gray-700 rounded-full animate-pulse" />
            </div>
        </div>
    </div>
);

/**
 * GameGrid Component
 * Strictly enforces three states:
 * 1. LOADING: Shows skeletons
 * 2. SUCCESS: Shows games
 * 3. EMPTY: Shows "No games found" ONLY after loading is confirmed false
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
    if (isCurrentlyLoading && gamesArray.length === 0) {
        return (
            <div className="mb-8">
                {title && (
                    <div className="flex items-center justify-between mb-6">
                        <div className="h-8 w-48 bg-gray-800 rounded-lg animate-pulse" />
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

    // State 3: EMPTY (Only if NOT loading and games array is empty)
    if (!isCurrentlyLoading && gamesArray.length === 0) {
        return (
            <div className="text-center py-20 bg-gray-800/20 rounded-2xl border border-gray-700/50 my-8">
                <div className="text-6xl mb-6 animate-bounce">🎮</div>
                <h3 className="text-2xl font-bold text-white mb-2">No Games Found</h3>
                <p className="text-gray-400 max-w-md mx-auto px-4">
                    Wait a moment while we refresh our catalog, or try adjusting your filters.
                </p>
                {viewAllHref && (
                    <Link
                        href="/"
                        className="mt-6 inline-block px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    >
                        Reset Filters
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
                            className="text-purple-400 hover:text-purple-300 text-sm font-semibold flex items-center gap-1 transition-colors"
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