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
    const [loadError, setLoadError] = useState(false);
    const containerRef = useRef(null);
    const iframeRef = useRef(null);

    // Check if this is a local game
    // Local games can be:
    // 1. React components (game_type === 'local' and game_url starts with 'local://')
    // 2. Local HTML files (game_url starts with '/games/' or game_type === 'local-html')
    // 3. Demo games (isDemoGame flag)
    const isLocalGame = game?.game_type === 'local' ||
        game?.game_type === 'local-html' ||
        game?.isDemoGame === true ||
        (game?.game_url && (game.game_url.startsWith('local://') || game.game_url.startsWith('/games/')));

    // Check if it's a local HTML file (not a React component)
    // For local HTML games, we'll load them through a special route that strips the layout
    const isLocalHTML = (game?.game_url && game.game_url.startsWith('/games/')) || game?.game_type === 'local-html';

    // Get the game file path for iframe loading
    // If game_url is a local HTML file, we'll load it directly
    // But we need to ensure it's a standalone file, not a Next.js page
    const getGameIframeSrc = () => {
        if (!game?.game_url) return null;
        // If it's already a full URL or starts with /games/, use it directly
        // But we'll add a query param to indicate it's for iframe embedding
        if (game.game_url.startsWith('/games/')) {
            return `${game.game_url}?embed=true`;
        }
        return game.game_url;
    };

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

    // Track play event (skip for demo games)
    useEffect(() => {
        if (game?.slug && !game?.isDemoGame) {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
            fetch(`${API_URL}/games/${game.slug}/play`, {
                method: 'POST',
            }).catch(console.error);
        }
    }, [game?.slug, game?.isDemoGame]);

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
            className={`relative bg-black ${isFullscreen
                ? 'fixed inset-0 z-50 flex items-center justify-center p-4'
                : 'w-full max-w-5xl mx-auto aspect-video max-h-[75vh]'
                }`}
        >
            {isLocalHTML ? (
                // Local HTML file game (embedded in iframe)
                loadError ? (
                    <div className="w-full aspect-video bg-gray-800 flex items-center justify-center">
                        <div className="text-center p-8">
                            <p className="text-gray-400 mb-2 text-lg">Game file not found</p>
                            <p className="text-gray-500 text-sm mb-4">
                                The game file at <code className="bg-gray-700 px-2 py-1 rounded">{game.game_url}</code> could not be loaded.
                            </p>
                            <p className="text-gray-500 text-sm">
                                Please ensure the game files are uploaded to the <code className="bg-gray-700 px-2 py-1 rounded">public/games/</code> folder.
                            </p>
                        </div>
                    </div>
                ) : (
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
                            src={getGameIframeSrc() || game.game_url}
                            title={game.title}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                            allowFullScreen
                            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                            onLoad={() => {
                                handleIframeLoad();
                                console.log('Game started:', game.title);
                                if (window.gameStart) window.gameStart();

                                // Check if iframe loaded a 404 or error page (website inside website)
                                setTimeout(() => {
                                    try {
                                        const iframe = iframeRef.current;
                                        if (iframe && iframe.contentWindow) {
                                            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                                            if (iframeDoc && iframeDoc.body) {
                                                // Check if it's showing the full website (has navigation/header)
                                                const hasNav = iframeDoc.querySelector('nav, header, [role="banner"]');
                                                const bodyText = iframeDoc.body?.innerText || '';
                                                const hasError = bodyText.includes('404') ||
                                                    bodyText.includes('Not Found') ||
                                                    (bodyText.includes('GameVault') && bodyText.includes('Home'));

                                                if (hasNav || hasError) {
                                                    console.warn('⚠️ Game iframe appears to contain full website layout or error page');
                                                    setLoadError(true);
                                                    setIsLoading(false);
                                                }
                                            }
                                        }
                                    } catch (e) {
                                        // Cross-origin - can't check, assume it's fine
                                        console.log('Iframe content check (cross-origin):', e.message);
                                    }
                                }, 2000);
                            }}
                            onError={() => {
                                setIsLoading(false);
                                setLoadError(true);
                                console.error('Failed to load game:', game.title);
                            }}
                        />
                    </>
                )
            ) : isLocalGame ? (
                // Local React component game (including demo games)
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