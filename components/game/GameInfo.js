// frontend/components/game/GameInfo.js

import { useState } from 'react';
import Link from 'next/link';
import { FaPlay, FaHeart, FaShare, FaExpand, FaMobileAlt, FaUsers, FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';

const GameInfo = ({ game }) => {
    const [liked, setLiked] = useState(false);

    // Safe format function - handle undefined/null
    const formatPlays = (plays) => {
        if (plays === undefined || plays === null) {
            return '0';
        }
        const num = Number(plays);
        if (isNaN(num)) return '0';
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        }
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K`;
        }
        return num.toString();
    };

    const handleShare = async () => {
        const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
        const shareText = `Play ${game?.title || 'this game'} on GameVault!`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: game?.title || 'GameVault',
                    text: shareText,
                    url: shareUrl,
                });
            } catch (err) {
                if (err.name !== 'AbortError') {
                    copyToClipboard(shareUrl);
                }
            }
        } else {
            copyToClipboard(shareUrl);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success('Link copied to clipboard!');
        }).catch(() => {
            toast.error('Failed to copy link');
        });
    };

    const handleLike = () => {
        setLiked(!liked);
        if (!liked) {
            toast.success('Added to favorites!');
        }
    };

    // Get game-specific instructions
    const getGameInstructions = () => {
        const slug = game?.slug?.toLowerCase() || '';
        
        if (slug === 'snake' || slug === 'snake-game') {
            return {
                description: 'Snake is a classic arcade game where you control a snake that grows longer as it eats food. Navigate through the grid, avoid walls and your own tail, and try to achieve the highest score possible!',
                instructions: `How to Play Snake:

1. Use the arrow keys (↑ ↓ ← →) or WASD keys to control the snake's direction
2. Guide the snake to eat the red food items to grow longer and increase your score
3. Avoid hitting the walls or your own tail - this will end the game
4. The game speeds up as your score increases, making it more challenging
5. Press Space or Escape to pause/resume the game
6. Try to achieve the highest score possible!

Controls:
- Arrow Keys or WASD: Move the snake
- Space/Escape: Pause/Resume
- Click "Start Game" to begin playing`
            };
        }
        
        if (slug === 'breakout' || slug === 'breakout-game') {
            return {
                description: 'Breakout is an exciting arcade game where you control a paddle to bounce a ball and break bricks. Clear all the bricks to complete the level while avoiding letting the ball fall!',
                instructions: `How to Play Breakout:

1. Move your mouse to control the purple paddle at the bottom of the screen
2. The ball will bounce off your paddle - position the paddle to aim the ball at the bricks
3. Break all the colored bricks to complete the level
4. You have 3 lives - if the ball falls below the paddle, you lose a life
5. Each brick you break gives you 10 points
6. Press Space or Escape to pause/resume the game
7. Try to achieve the highest score possible!

Controls:
- Mouse: Move the paddle left and right
- Space/Escape: Pause/Resume
- Click "Start Game" to begin playing`
            };
        }

        
        return null;
    };

    const gameInstructions = getGameInstructions();

    // Return null or loading state if no game data
    if (!game) {
        return (
            <div className="space-y-6">
                <div className="h-8 w-2/3 bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-700 rounded animate-pulse" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Title and Category */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">{game.title}</h1>
                <div className="flex flex-wrap items-center gap-3">
                    {game.category_name && (
                        <Link
                            href={`/category/${game.category_slug || ''}`}
                            className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm hover:bg-purple-600/30 transition-colors"
                        >
                            {game.category_icon || '🎮'} {game.category_name}
                        </Link>
                    )}
                    <span className="text-gray-400 text-sm flex items-center gap-1">
            <FaPlay className="w-3 h-3" />
                        {formatPlays(game.plays)} plays
          </span>
                    <span className="text-gray-400 text-sm flex items-center gap-1">
            <FaHeart className="w-3 h-3" />
                        {formatPlays(game.likes)} likes
          </span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
                <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        liked
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                    <FaHeart className={liked ? 'text-white' : ''} />
                    {liked ? 'Liked' : 'Like'}
                </button>
                <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                >
                    <FaShare />
                    Share
                </button>
                {/* Rewarded Ad Button - Only shown when user clicks (compliance requirement) */}
                <button
                    onClick={async () => {
                        if (window.showRewardedAd) {
                            try {
                                const result = await window.showRewardedAd();
                                if (result) {
                                    toast.success('Reward unlocked! Thank you for watching.');
                                }
                            } catch (error) {
                                console.error('Rewarded ad error:', error);
                                toast.error('Ad not available at this time.');
                            }
                        } else {
                            toast.info('Rewarded ads coming soon!');
                        }
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors"
                >
                    🎁 Watch Ad for Reward
                </button>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
                {game.multiplayer && (
                    <span className="flex items-center gap-1 px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
            <FaUsers className="w-3 h-3" />
            Multiplayer
          </span>
                )}
                {game.mobile_friendly && (
                    <span className="flex items-center gap-1 px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm">
            <FaMobileAlt className="w-3 h-3" />
            Mobile Friendly
          </span>
                )}
                {game.featured && (
                    <span className="flex items-center gap-1 px-3 py-1 bg-yellow-600/20 text-yellow-400 rounded-full text-sm">
            <FaStar className="w-3 h-3" />
            Featured
          </span>
                )}
            </div>

            {/* Description */}
            <div className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-3">About This Game</h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {game.description || gameInstructions?.description || `Play ${game.title} for free on GameVault. Enjoy hours of entertainment with this exciting HTML5 game!`}
                </p>
            </div>

            {/* How to Play Section - Required for H5 Games Ads */}
            <div className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-3">How to Play</h2>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {game.instructions || gameInstructions?.instructions || `Learn how to play ${game.title}:

1. Click the "Start Game" button to begin
2. Follow the on-screen instructions
3. Use the controls to play the game
4. Try to achieve the highest score possible!
5. Press Space or Escape to pause the game at any time

Enjoy playing ${game.title}!`}
                </div>
            </div>
        </div>
    );
};

export default GameInfo;