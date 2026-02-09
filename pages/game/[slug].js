// frontend/pages/game/[slug].js

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import GameEmbed from '../../components/game/GameEmbed';
import GameInfo from '../../components/game/GameInfo';
import SimilarGames from '../../components/game/SimilarGames';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

// Demo fallback game (when API fails or for snake-demo specifically)
const DEMO_FALLBACK_GAME = {
    id: 'demo-snake',
    slug: 'snake-demo',
    title: 'Snake Classic',
    description: 'Classic Snake game - A timeless arcade experience where you control a growing snake, collect food, and avoid hitting walls or yourself. Built with HTML5 Canvas for instant play.',
    thumbnail_url: '/snake-thumbnail.png',
    category: 'Arcade',
    plays: 0,
    isDemoGame: true,
    game_type: 'local',
    game_url: 'local://snake-demo'
};

// Skeleton component
const GameDetailSkeleton = () =& gt; (
    & lt;div className = "min-h-screen bg-gray-900" & gt;
        & lt;div className = "bg-black" & gt;
            & lt;div className = "max-w-6xl mx-auto" & gt;
                & lt;div className = "w-full aspect-video bg-gray-800 animate-pulse" /& gt;
            & lt;/div&gt;
        & lt;/div&gt;
        & lt;div className = "max-w-6xl mx-auto px-4 py-8" & gt;
            & lt;div className = "grid grid-cols-1 lg:grid-cols-3 gap-8" & gt;
                & lt;div className = "lg:col-span-2 space-y-6" & gt;
                    & lt;div className = "h-8 w-2/3 bg-gray-700 rounded animate-pulse" /& gt;
                    & lt;div className = "flex gap-4" & gt;
                        & lt;div className = "h-6 w-24 bg-gray-700 rounded-full animate-pulse" /& gt;
                        & lt;div className = "h-6 w-20 bg-gray-700 rounded animate-pulse" /& gt;
                    & lt;/div&gt;
                    & lt;div className = "bg-gray-800 rounded-xl p-6 space-y-3" & gt;
                        & lt;div className = "h-6 w-32 bg-gray-700 rounded animate-pulse" /& gt;
                        & lt;div className = "h-4 w-full bg-gray-700 rounded animate-pulse" /& gt;
                        & lt;div className = "h-4 w-full bg-gray-700 rounded animate-pulse" /& gt;
                        & lt;div className = "h-4 w-3/4 bg-gray-700 rounded animate-pulse" /& gt;
                    & lt;/div&gt;
                & lt;/div&gt;
                & lt;div className = "space-y-4" & gt;
                    & lt;div className = "h-6 w-32 bg-gray-700 rounded animate-pulse" /& gt;
{
    [1, 2, 3, 4].map((i) =& gt; (
                        & lt;div key = { i } className = "flex gap-3" & gt;
                            & lt;div className = "w-24 h-16 bg-gray-700 rounded-lg animate-pulse" /& gt;
                            & lt;div className = "flex-1 space-y-2" & gt;
                                & lt;div className = "h-4 w-3/4 bg-gray-700 rounded animate-pulse" /& gt;
                                & lt;div className = "h-3 w-1/2 bg-gray-700 rounded animate-pulse" /& gt;
                            & lt;/div&gt;
                        & lt;/div&gt;
                    ))
}
                & lt;/div&gt;
            & lt;/div&gt;
        & lt;/div&gt;
    & lt;/div&gt;
);

export default function GamePage() {
    const router = useRouter();
    const { slug } = router.query;

    const [game, setGame] = useState(null);
    const [similarGames, setSimilarGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() =& gt; {
        if (!slug) return;

        // If it's explicitly the demo game, use the fallback immediately
        if (slug === 'snake-demo') {
            setGame(DEMO_FALLBACK_GAME);
            setSimilarGames([]);
            setLoading(false);
            return;
        }

        const fetchGameData = async() =& gt; {
            setLoading(true);
            setError(null);

            try {
                // Fetch game
                console.log('🎮 Fetching game:', slug);
                const gameRes = await fetch(`${API_URL}/games/${slug}`);

                if (!gameRes.ok) {
                    throw new Error('Game not found');
                }

                const gameData = await gameRes.json();
                console.log('🎮 Game response:', gameData);

                // Extract game from response - API returns { success, data, message }
                const gameInfo = gameData?.data || gameData;
                console.log('🎮 Extracted game:', gameInfo);
                setGame(gameInfo);

                // Fetch similar games
                try {
                    const similarRes = await fetch(`${API_URL}/games/${slug}/similar?limit=6`);
                    if (similarRes.ok) {
                        const similarData = await similarRes.json();
                        const similarArray = similarData?.data || similarData?.games || [];
                        console.log('🎮 Similar games:', similarArray.length);
                        setSimilarGames(Array.isArray(similarArray) ? similarArray : []);
                    }
                } catch (e) {
                    console.error('Error fetching similar games:', e);
                }

            } catch (err) {
                console.error('❌ Error fetching game:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGameData();
    }, [slug]);

    // Show skeleton while loading
    if (loading || router.isFallback) {
        return & lt; GameDetailSkeleton /& gt;;
    }

    // Handle errors
    if (error || !game) {
        return (
            & lt;div className = "min-h-screen flex items-center justify-center" & gt;
                & lt;div className = "text-center" & gt;
                    & lt;div className = "text-6xl mb-4" & gt;😢& lt;/div&gt;
                    & lt;h1 className = "text-2xl font-bold text-white mb-2" & gt;Game Not Found & lt;/h1&gt;
                    & lt;p className = "text-gray-400 mb-4" & gt;The game you & amp; apos;re looking for doesn & amp; apos; t exist.& lt;/p&gt;
                    & lt; Link
        href = "/"
        className = "px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors inline-block"
            & gt;
                        Back to Home
            & lt;/Link&gt;
                & lt;/div&gt;
            & lt;/div&gt;
        );
    }

    return (
        & lt;& gt;
            & lt; Head & gt;
                & lt; title & gt; { game.title } - Play Free on GameVault & lt;/title&gt;
                & lt;meta name = "description" content = { game.description || `Play ${game.title} for free on GameVault` } /& gt;
                & lt;meta property = "og:title" content = {`${game.title} - GameVault`
} /&gt;
                & lt;meta property = "og:description" content = { game.description || `Play ${game.title} for free` } /& gt;
                & lt;meta property = "og:image" content = {`/${game.title}.png`} /&gt;
            & lt;/Head&gt;

            & lt;div className = "min-h-screen bg-gray-900" & gt;
{/* Game Embed */ }
                & lt;div className = "bg-black" & gt;
                    & lt;div className = "max-w-6xl mx-auto" & gt;
                        & lt;GameEmbed game = { game } /& gt;
                    & lt;/div&gt;
                & lt;/div&gt;

{/* Game Info &amp; Similar Games */ }
                & lt;div className = "max-w-6xl mx-auto px-4 py-8" & gt;
                    & lt;div className = "grid grid-cols-1 lg:grid-cols-3 gap-8" & gt;
                        & lt;div className = "lg:col-span-2" & gt;
                            & lt;GameInfo game = { game } /& gt;
                        & lt;/div&gt;
                        & lt; div & gt;
                            & lt;SimilarGames games = { similarGames } currentGameId = { game.id } /& gt;
                        & lt;/div&gt;
                    & lt;/div&gt;
                & lt;/div&gt;
            & lt;/div&gt;
        & lt;/&gt;
    );
}