import { useState } from 'react';
import Link from 'next/link';
import { FaPlay, FaUsers, FaMobileAlt } from 'react-icons/fa';

const resolveLocalImage = (title) => {
    // Special-case mapping where file names don't exactly match titles
    if (title === 'Krunker.io') return '/Krunker.png';
    return `/${title}.png`;
};

const GameCard = ({ game }) => {
    // Prefer local images you’ve provided (in Next.js `public` folder) based on game title
    const [imgSrc, setImgSrc] = useState(() => resolveLocalImage(game.title));

    const handleImageError = () => {
        const colors = ['6366f1', 'ec4899', '8b5cf6', '14b8a6', 'f59e0b', 'ef4444', '22c55e', '3b82f6'];
        const colorIndex = game.title.charCodeAt(0) % colors.length;
        const bgColor = colors[colorIndex];
        setImgSrc(`https://placehold.co/512x384/${bgColor}/ffffff?text=${encodeURIComponent(game.title.substring(0, 2).toUpperCase())}`);
    };

    return (
        <Link href={`/game/${game.slug}`}>
            <div className="game-card group relative bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer">

                {/* Image */}
                <div className="relative aspect-video bg-gray-900 overflow-hidden">
                    <img
                        src={imgSrc}
                        alt={game.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={handleImageError}
                        loading="lazy"
                    />

                    {/* Play Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-purple-600 text-white px-4 py-2 rounded-full flex items-center gap-2">
                            <FaPlay className="text-sm" />
                            <span className="font-semibold text-sm">Play</span>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="absolute top-2 right-2 flex flex-col gap-1">
                        {game.multiplayer === 1 && (
                            <span className="bg-blue-500 text-white text-xs p-1.5 rounded-full" title="Multiplayer">
                <FaUsers className="text-xs" />
              </span>

                        )}
                        {game.mobile_friendly === 1 && (
                            <span className="bg-green-500 text-white text-xs p-1.5 rounded-full" title="Mobile Friendly">
                <FaMobileAlt className="text-xs" />
              </span>
                        )}
                    </div>
                </div>

                {/* Info */}
                <div className="p-3">
                    <h3 className="text-white font-semibold text-sm truncate group-hover:text-purple-400 transition-colors">
                        {game.title}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1 truncate">
                        {game.category_name || 'Game'}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default GameCard;