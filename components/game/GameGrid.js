// frontend/components/game/GameGrid.js

import Link from 'next/link';
import GameCard from './GameCard';

// Inline skeleton
const GameCardSkeleton = () =& gt; (
    & lt;div className = "bg-gray-800 rounded-xl overflow-hidden" & gt;
        & lt;div className = "aspect-[4/3] bg-gray-700 animate-pulse" /& gt;
        & lt;div className = "p-3 space-y-2" & gt;
            & lt;div className = "h-5 w-3/4 bg-gray-700 rounded animate-pulse" /& gt;
            & lt;div className = "flex items-center justify-between" & gt;
                & lt;div className = "h-4 w-16 bg-gray-700 rounded animate-pulse" /& gt;
                & lt;div className = "h-5 w-5 bg-gray-700 rounded animate-pulse" /& gt;
            & lt;/div&gt;
        & lt;/div&gt;
    & lt;/div&gt;
);

const GameGrid = ({ games =[], loading = false, isLoading = false, title, showViewAll, viewAllHref }) =& gt; {
    // Support both 'loading' and 'isLoading' props for compatibility
    const isLoadingState = loading || isLoading;

    if (isLoadingState) {
        return (
            & lt;div className = "mb-8" & gt;
        {
            title & amp;& amp; (
                    & lt;div className = "flex items-center justify-between mb-4" & gt;
                        & lt;div className = "h-7 w-40 bg-gray-700 rounded animate-pulse" /& gt;
                    & lt;/div&gt;
                )
        }
                & lt;div className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4" & gt;
        {
            Array.from({ length: 12 }).map((_, i) =& gt; (
                        & lt;GameCardSkeleton key = { i } /& gt;
                    ))
        }
                & lt;/div&gt;
            & lt;/div&gt;
        );
    }

    const gamesArray = Array.isArray(games) ? games : [];

    if (gamesArray.length === 0) {
        return (
            & lt;div className = "text-center py-12" & gt;
                & lt;div className = "text-6xl mb-4" & gt;🎮& lt;/div&gt;
                & lt;h3 className = "text-xl font-semibold text-gray-300 mb-2" & gt;No games found & lt;/h3&gt;
                & lt;p className = "text-gray-500" & gt;Try adjusting your search or filter & lt;/p&gt;
            & lt;/div&gt;
        );
    }

    return (
        & lt;div className = "mb-8" & gt;
    {
        title & amp;& amp; (
                & lt;div className = "flex items-center justify-between mb-4" & gt;
                    & lt;h2 className = "text-xl font-bold text-white" & gt; { title }& lt;/h2&gt;
        {
            showViewAll & amp;& amp; viewAllHref & amp;& amp; (
                        & lt; Link
            href = { viewAllHref }
            className = "text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                & gt;
                            View All →
                        & lt;/Link&gt;
                    )
        }
                & lt;/div&gt;
            )
    }
            & lt;div className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4" & gt;
    {
        gamesArray.map((game) =& gt; (
                    & lt;GameCard key = { game.id } game = { game } /& gt;
                ))
    }
            & lt;/div&gt;
        & lt;/div&gt;
    );
};

export default GameGrid;