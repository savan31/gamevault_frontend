// frontend/components/game/GameEmbed.js
// Updated to use local HTML5 games instead of iframes

import { useState, useRef, useEffect } from 'react';
import { FaExpand, FaCompress } from 'react-icons/fa';
import GameLoader from '../games/GameLoader';

const resolveGameImage = (title) => {
    if (title === 'Krunker.io') return '/Krunker.png';
    return `/${title}.png`;
};

const GameEmbed = ({ game }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef(null);

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
                    : 'w-full max-w-5xl mx-auto'
            }`}
        >
            <div className={`w-full ${isFullscreen ? 'h-full flex items-center justify-center' : ''}`}>
                <GameLoader
                    game={game}
                    onGameStart={() => {
                        // Track game start
                        console.log('Game started:', game.title);
                    }}
                    onGameOver={(score) => {
                        // Track game over
                        console.log('Game over:', game.title, 'Score:', score);
                    }}
                    onGamePause={() => {
                        console.log('Game paused:', game.title);
                    }}
                    onGameResume={() => {
                        console.log('Game resumed:', game.title);
                    }}
                />
            </div>

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