// frontend/components/game/GameEmbed.js
// Supports both local HTML5 games and external iframe games

import { useState, useRef, useEffect } from 'react';
import { FaExpand, FaCompress } from 'react-icons/fa';
import GameLoader from '../games/GameLoader';

const resolveGameImage = (title) =& gt; {
    if (title === 'Krunker.io') return '/Krunker.png';
    return `/${title}.png`;
};

const GameEmbed = ({ game }) =& gt; {
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
        (game?.game_url & amp;& amp; (game.game_url.startsWith('local://') || game.game_url.startsWith('/games/')));

    // Check if it's a local HTML file (not a React component)
    // For local HTML games, we'll load them through a special route that strips the layout
    const isLocalHTML = (game?.game_url & amp;& amp; game.game_url.startsWith('/games/')) || game?.game_type === 'local-html';

    // Get the game file path for iframe loading
    // If game_url is a local HTML file, we'll load it directly
    // But we need to ensure it's a standalone file, not a Next.js page
    const getGameIframeSrc = () =& gt; {
        if (!game?.game_url) return null;
        // If it's already a full URL or starts with /games/, use it directly
        // But we'll add a query param to indicate it's for iframe embedding
        if (game.game_url.startsWith('/games/')) {
            return `${game.game_url}?embed=true`;
        }
        return game.game_url;
    };

    // Handle fullscreen
    const toggleFullscreen = () =& gt; {
        if (!containerRef.current) return;

        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().then(() =& gt; {
                setIsFullscreen(true);
            }).catch (err =& gt; {
                console.error('Fullscreen error:', err);
            });
        } else {
            document.exitFullscreen().then(() =& gt; {
                setIsFullscreen(false);
            });
        }
    };

    // Listen for fullscreen changes
    useEffect(() =& gt; {
        const handleFullscreenChange = () =& gt; {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () =& gt; document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Track play event (skip for demo games)
    useEffect(() =& gt; {
        if (game?.slug & amp;& amp; !game?.isDemoGame) {
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
            fetch(`${API_URL}/games/${game.slug}/play`, {
                method: 'POST',
            }).catch(console.error);
        }
    }, [game?.slug, game?.isDemoGame]);

    // Handle iframe load
    const handleIframeLoad = () =& gt; {
        setIsLoading(false);
    };

    if (!game) {
        return (
            & lt;div className = "w-full aspect-video bg-gray-800 flex items-center justify-center" & gt;
                & lt;p className = "text-gray-400" & gt;Loading game...& lt;/p&gt;
            & lt;/div&gt;
        );
    }

    return (
        & lt; div
    ref = { containerRef }
    className = {`relative bg-black ${isFullscreen
            ? 'fixed inset-0 z-50 flex items-center justify-center p-4'
            : 'w-full max-w-5xl mx-auto aspect-video max-h-[75vh]'
        }`
}
        & gt;
{
    isLocalHTML ? (
        // Local HTML file game (embedded in iframe)
        loadError ? (
                    & lt;div className = "w-full aspect-video bg-gray-800 flex items-center justify-center" & gt;
                        & lt;div className = "text-center p-8" & gt;
                            & lt;p className = "text-gray-400 mb-2 text-lg" & gt;Game file not found & lt;/p&gt;
                            & lt;p className = "text-gray-500 text-sm mb-4" & gt;
                                The game file at & lt;code className = "bg-gray-700 px-2 py-1 rounded" & gt; { game.game_url }& lt;/code&gt; could not be loaded.
        & lt;/p&gt;
                            & lt;p className = "text-gray-500 text-sm" & gt;
                                Please ensure the game files are uploaded to the & lt;code className = "bg-gray-700 px-2 py-1 rounded" & gt; public / games /& lt;/code&gt; folder.
        & lt;/p&gt;
                        & lt;/div&gt;
                    & lt;/div&gt;
                ) : (
                    & lt;& gt;
    {
        isLoading & amp;& amp; (
                            & lt;div className = "absolute inset-0 flex items-center justify-center bg-gray-900 z-10" & gt;
                                & lt;div className = "flex flex-col items-center gap-4" & gt;
                                    & lt;div className = "w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" /& gt;
                                    & lt;p className = "text-white" & gt;Loading game...& lt;/p&gt;
                                & lt;/div&gt;
                            & lt;/div&gt;
                        )
    }
                        & lt; iframe
    ref = { iframeRef }
    src = { getGameIframeSrc() || game.game_url
}
title = { game.title }
className = "w-full h-full border-0"
allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
allowFullScreen
sandbox = "allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
onLoad = {() =& gt; {
    handleIframeLoad();
    console.log('Game started:', game.title);
    if (window.gameStart) window.gameStart();

    // Check if iframe loaded a 404 or error page (website inside website)
    setTimeout(() =& gt; {
        try {
            const iframe = iframeRef.current;
            if (iframe & amp;& amp; iframe.contentWindow) {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                if (iframeDoc & amp;& amp; iframeDoc.body) {
                    // Check if it's showing the full website (has navigation/header)
                    const hasNav = iframeDoc.querySelector('nav, header, [role="banner"]');
                    const bodyText = iframeDoc.body?.innerText || '';
                    const hasError = bodyText.includes('404') ||
                        bodyText.includes('Not Found') ||
                        (bodyText.includes('GameVault') & amp;& amp; bodyText.includes('Home'));

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
onError = {() =& gt; {
    setIsLoading(false);
    setLoadError(true);
    console.error('Failed to load game:', game.title);
}}
                        /&gt;
                    & lt;/&gt;
                )
            ) : isLocalGame ? (
                // Local React component game (including demo games)
                & lt;div className = {`w-full ${isFullscreen ? 'h-full flex items-center justify-center' : ''}`}& gt;
                    & lt; GameLoader
game = { game }
onGameStart = {() =& gt; {
    console.log('Game started:', game.title);
    if (window.gameStart) window.gameStart();
}}
onGameOver = {(score) =& gt; {
    console.log('Game over:', game.title, 'Score:', score);
    if (window.gameOver) window.gameOver(score);
    if (window.showInterstitialAd) window.showInterstitialAd();
}}
onGamePause = {() =& gt; {
    console.log('Game paused:', game.title);
    if (window.gamePause) window.gamePause();
}}
onGameResume = {() =& gt; {
    console.log('Game resumed:', game.title);
    if (window.gameResume) window.gameResume();
}}
                    /&gt;
                & lt;/div&gt;
            ) : game?.game_url ? (
                // External iframe game
                & lt;& gt;
{
    isLoading & amp;& amp; (
                        & lt;div className = "absolute inset-0 flex items-center justify-center bg-gray-900 z-10" & gt;
                            & lt;div className = "flex flex-col items-center gap-4" & gt;
                                & lt;div className = "w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" /& gt;
                                & lt;p className = "text-white" & gt;Loading game...& lt;/p&gt;
                            & lt;/div&gt;
                        & lt;/div&gt;
                    )
}
                    & lt; iframe
ref = { iframeRef }
src = { game.game_url }
title = { game.title }
className = "w-full h-full border-0"
allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
allowFullScreen
onLoad = { handleIframeLoad }
    /& gt;
                & lt;/&gt;
            ) : (
                // No game URL available
                & lt;div className = "w-full aspect-video bg-gray-800 flex items-center justify-center" & gt;
                    & lt;div className = "text-center" & gt;
                        & lt;p className = "text-gray-400 mb-2" & gt;Game URL not available & lt;/p&gt;
                        & lt;p className = "text-gray-500 text-sm" & gt;Please contact support if this issue persists.& lt;/p&gt;
                    & lt;/div&gt;
                & lt;/div&gt;
            )}

{/* Fullscreen Control */ }
            & lt;div className = "absolute bottom-4 right-4 flex gap-2 z-20" & gt;
                & lt; button
onClick = { toggleFullscreen }
className = "p-3 bg-black/70 hover:bg-black/90 rounded-lg text-white transition-colors"
title = { isFullscreen? 'Exit Fullscreen': 'Fullscreen' }
    & gt;
{ isFullscreen ? & lt;FaCompress className = "w-5 h-5" /& gt; : & lt;FaExpand className = "w-5 h-5" /& gt; }
                & lt;/button&gt;
            & lt;/div&gt;
        & lt;/div&gt;
    );
};

export default GameEmbed;