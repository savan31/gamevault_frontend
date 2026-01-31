import Link from 'next/link';
import { FiArrowRight, FiTrendingUp } from 'react-icons/fi';
import { useTrendingGames } from '@/hooks/useApi';
import GameGrid from '../game/GameGrid';

export default function TrendingGames() {
    const { games, isLoading } = useTrendingGames(12);

    // Filter to show at least the 4 new games if available
    const prioritizedGames = games && games.length > 0 
        ? games.filter(game => ['spider', 'puzzle', 'pacman', 'bounce'].includes(game.slug))
            .concat(games.filter(game => !['spider', 'puzzle', 'pacman', 'bounce'].includes(game.slug)))
            .slice(0, 12)
        : games;

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

                <GameGrid games={prioritizedGames || games} isLoading={isLoading} columns={6} />
            </div>
        </section>
    );
}