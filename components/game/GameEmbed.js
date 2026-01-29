// frontend/components/game/GameEmbed.js

import { useState, useRef, useEffect } from 'react';
import { FaExpand, FaCompress, FaPlay, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const resolveGameImage = (title) => {
    if (title === 'Krunker.io') return '/Krunker.png';
    return `/${title}.png`;
};

const GameEmbed = ({ game }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef(null);
    const iframeRef = useRef(null);

    // Handle fullscreen
    const toggleFullscreen = () => {
        if (!containerRef.current) return;

        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().then(() => {
                setIsFullscreen(true);
            }).catch(err => {
                console.error('Fullscreen error:', err);
            });
        } else {
            document.exitFullscreen().then(() => {
                setIsFullscreen(false);
            });
        }
    };

    // Listen for fullscreen changes
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Start playing
    const handlePlay = () => {
        setIsLoading(true);
        setIsPlaying(true);

        // Track play event
        if (game?.slug) {
            fetch(`http://localhost:5000/api/v1/games/${game.slug}/play`, {
                method: 'POST',
            }).catch(console.error);
        }
    };

    // Handle iframe load
    const handleIframeLoad = () => {
        setIsLoading(false);
    };

    if (!game) {
        return (
            <div className="w-full aspect-video bg-gray-800 flex items-center justify-center">
                <p className="text-gray-400">Loading game...</p>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={`relative bg-black ${
                isFullscreen
                    ? 'fixed inset-0 z-50'
                    : 'w-full max-w-5xl mx-auto aspect-video max-h-[75vh]'
            }`}
        >
            {!isPlaying ? (
                // Play button overlay
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    {/* Thumbnail */}
                    <img
                        src={resolveGameImage(game.title)}
                        alt={game.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-50"
                        onError={(e) => {
                            if (game.thumbnail_url && e.currentTarget.src !== game.thumbnail_url) {
                                e.currentTarget.src = game.thumbnail_url;
                            } else {
                                e.currentTarget.src = `https://placehold.co/960x540/1f2937/9ca3af?text=${encodeURIComponent(game.title || 'GameVault')}`;
                            }
                        }}
                    />

                    {/* Play button */}
                    <button
                        onClick={handlePlay}
                        className="relative z-10 flex flex-col items-center gap-4 group"
                    >
                        <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center group-hover:bg-purple-500 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-purple-600/50">
                            <FaPlay className="w-10 h-10 text-white ml-2" />
                        </div>
                        <span className="text-white text-xl font-semibold bg-black/50 px-4 py-2 rounded-lg">
              Play {game.title}
            </span>
                    </button>
                </div>
            ) : (
                // Game iframe
                <>
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
                                <p className="text-white">Loading game...</p>
                            </div>
                        </div>
                    )}

                    <iframe
                        ref={iframeRef}
                        src={game.game_url}
                        title={game.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        allowFullScreen
                        onLoad={handleIframeLoad}
                    />

                    {/* Controls */}
                    <div className="absolute bottom-4 right-4 flex gap-2 z-20">
                        <button
                            onClick={toggleFullscreen}
                            className="p-3 bg-black/70 hover:bg-black/90 rounded-lg text-white transition-colors"
                            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                        >
                            {isFullscreen ? <FaCompress className="w-5 h-5" /> : <FaExpand className="w-5 h-5" />}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default GameEmbed;