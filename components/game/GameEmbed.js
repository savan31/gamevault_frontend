// frontend/components/game/GameEmbed.js
// Supports both local HTML5 games and external iframe games

import { useState, useRef, useEffect } from 'react';
import { FaExpand, FaCompress } from 'react-icons/fa';
import GameLoader from '../games/GameLoader';

const resolveGameImage = (title) => {
    if (title === 'Krunker.io') return '/Krunker.png';
    return `/${title}.png`;
};

const GameEmbed = ({ game }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef(null);
    const iframeRef = useRef(null);

    // Check if this is a local game
    const isLocalGame = game?.game_type === 'local' || 
                        (game?.game_url && game.game_url.startsWith('local://'));

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

    // Track play event
    useEffect(() => {
        if (game?.slug) {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
            fetch(`${API_URL}/games/${game.slug}/play`, {
                method: 'POST',
            }).catch(console.error);
        }
    }, [game?.slug]);

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
                    ? 'fixed inset-0 z-50 flex items-center justify-center p-4'
                    : 'w-full max-w-5xl mx-auto aspect-video max-h-[75vh]'
            }`}
        >
            {isLocalGame ? (
                // Local HTML5 game
                <div className={`w-full ${isFullscreen ? 'h-full flex items-center justify-center' : ''}`}>
                    <GameLoader
                        game={game}
                        onGameStart={() => {
                            console.log('Game started:', game.title);
                            if (window.gameStart) window.gameStart();
                        }}
                        onGameOver={(score) => {
                            console.log('Game over:', game.title, 'Score:', score);
                            if (window.gameOver) window.gameOver(score);
                            if (window.showInterstitialAd) window.showInterstitialAd();
                        }}
                        onGamePause={() => {
                            console.log('Game paused:', game.title);
                            if (window.gamePause) window.gamePause();
                        }}
                        onGameResume={() => {
                            console.log('Game resumed:', game.title);
                            if (window.gameResume) window.gameResume();
                        }}
                    />
                </div>
            ) : game?.game_url ? (
                // External iframe game
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
                </>
            ) : (
                // No game URL available
                <div className="w-full aspect-video bg-gray-800 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-gray-400 mb-2">Game URL not available</p>
                        <p className="text-gray-500 text-sm">Please contact support if this issue persists.</p>
                    </div>
                </div>
            )}

            {/* Fullscreen Control */}
            <div className="absolute bottom-4 right-4 flex gap-2 z-20">
                <button
                    onClick={toggleFullscreen}
                    className="p-3 bg-black/70 hover:bg-black/90 rounded-lg text-white transition-colors"
                    title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                >
                    {isFullscreen ? <FaCompress className="w-5 h-5" /> : <FaExpand className="w-5 h-5" />}
                </button>
            </div>
        </div>
    );
};

export default GameEmbed;