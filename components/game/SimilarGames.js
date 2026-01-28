// frontend/components/game/SimilarGames.js

import Link from 'next/link';

const SimilarGames = ({ games = [], currentGameId }) => {
    // Filter out current game and ensure we have an array
    const filteredGames = Array.isArray(games)
        ? games.filter(game => game.id !== currentGameId).slice(0, 6)
        : [];

    if (filteredGames.length === 0) {
        return (
            <div className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Similar Games</h2>
                <p className="text-gray-400 text-sm">No similar games found</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Similar Games</h2>
            <div className="space-y-3">
                {filteredGames.map((game) => (
                    <Link
                        key={game.id}
                        href={`/game/${game.slug}`}
                        className="flex gap-3 group hover:bg-gray-700/50 rounded-lg p-2 -mx-2 transition-colors"
                    >
                        <div className="w-20 h-14 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                                src={game.title === 'Krunker.io' ? '/Krunker.png' : `/${game.title}.png`}
                                alt={game.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                onError={(e) => {
                                    if (game.thumbnail_url && e.currentTarget.src !== game.thumbnail_url) {
                                        e.currentTarget.src = game.thumbnail_url;
                                    } else {
                                        e.currentTarget.src = `https://placehold.co/160x112/1f2937/9ca3af?text=${encodeURIComponent(game.title?.substring(0, 2) || 'GV')}`;
                                    }
                                }}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-white text-sm truncate group-hover:text-purple-400 transition-colors">
                                {game.title}
                            </h3>
                            <p className="text-xs text-gray-400 mt-1">
                                {game.category_name || 'Game'}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SimilarGames;