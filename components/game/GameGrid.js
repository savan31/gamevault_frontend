// frontend/components/game/GameGrid.js

import Link from 'next/link';
import GameCard from './GameCard';

// Inline skeleton
const GameCardSkeleton = () => (
    <div className="bg-gray-800 rounded-xl overflow-hidden">
        <div className="aspect-[4/3] bg-gray-700 animate-pulse" />
        <div className="p-3 space-y-2">
            <div className="h-5 w-3/4 bg-gray-700 rounded animate-pulse" />
            <div className="flex items-center justify-between">
                <div className="h-4 w-16 bg-gray-700 rounded animate-pulse" />
                <div className="h-5 w-5 bg-gray-700 rounded animate-pulse" />
            </div>
        </div>
    </div>
);

const GameGrid = ({ games = [], loading = false, isLoading = false, title, showViewAll, viewAllHref }) => {
    // Support both 'loading' and 'isLoading' props for compatibility
    const isLoadingState = Boolean(loading || isLoading);

    if (isLoadingState) {
        return (
            <div className="mb-8">
                {title && (
                    <div className="flex items-center justify-between mb-4">
                        <div className="h-7 w-40 bg-gray-700 rounded animate-pulse" />
                    </div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <GameCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    const gamesArray = Array.isArray(games) ? games : [];

    if (gamesArray.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-6xl mb-4">🎮</div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No games found</h3>
                <p className="text-gray-500">Try adjusting your search or filter</p>
            </div>
        );
    }

    return (
        <div className="mb-8">
            {title && (
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    {showViewAll && viewAllHref && (
                        <Link
                            href={viewAllHref}
                            className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                        >
                            View All →
                        </Link>
                    )}
                </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {gamesArray.map((game) => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        </div>
    );
};

export default GameGrid;