// GameLoader - Loads the appropriate local game component
import dynamic from 'next/dynamic';
import SnakeGame from './SnakeGame';
import BreakoutGame from './BreakoutGame';

// Map game slugs to game components
const GAME_COMPONENTS = {
    'snake': SnakeGame,
    'snake-game': SnakeGame,
    'breakout': BreakoutGame,
    'breakout-game': BreakoutGame,
};

const GameLoader = ({ game, onGameStart, onGameOver, onGamePause, onGameResume }) => {
    if (!game) {
        return (
            <div className="w-full aspect-video bg-gray-800 flex items-center justify-center">
                <p className="text-gray-400">Loading game...</p>
            </div>
        );
    }

    // Check if this is a local game
    const gameSlug = game.slug?.toLowerCase() || '';
    const GameComponent = GAME_COMPONENTS[gameSlug];

    if (!GameComponent) {
        // Fallback for games that don't have local versions yet
        return (
            <div className="w-full aspect-video bg-gray-800 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-400 mb-2">Game not available</p>
                    <p className="text-gray-500 text-sm">This game is currently being updated.</p>
                </div>
            </div>
        );
    }

    return (
        <GameComponent
            onGameStart={onGameStart}
            onGameOver={onGameOver}
            onGamePause={onGamePause}
            onGameResume={onGameResume}
        />
    );
};

export default GameLoader;

