// GameLoader - Loads the appropriate local game component
import dynamic from 'next/dynamic';
import SnakeGame from './SnakeGame';
import BreakoutGame from './BreakoutGame';

// Map game slugs to game components
const GAME_COMPONENTS = {
    'snake': SnakeGame,
    'snake-game': SnakeGame,
    'snake-demo': SnakeGame, // Demo fallback game
    'snake-classic': SnakeGame,
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

    // Check if this is a local game by game_type or game_url or isDemoGame flag
    const isLocalGame = game.game_type === 'local' ||
        game.isDemoGame === true ||
        (game.game_url && game.game_url.startsWith('local://'));

    // Get game component by slug
    const gameSlug = game.slug?.toLowerCase() || '';
    const GameComponent = GAME_COMPONENTS[gameSlug];

    // If it's marked as local but we don't have a component, show error
    if (isLocalGame && !GameComponent) {
        return (
            <div className="w-full aspect-video bg-gray-800 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-400 mb-2">Local game not implemented</p>
                    <p className="text-gray-500 text-sm">This game is marked as local but the component is missing.</p>
                </div>
            </div>
        );
    }

    // If it's not a local game, return null (GameEmbed will handle iframe)
    if (!isLocalGame) {
        return null;
    }

    // If we have a component, render it
    if (GameComponent) {
        return (
            <GameComponent
                onGameStart={onGameStart}
                onGameOver={onGameOver}
                onGamePause={onGamePause}
                onGameResume={onGameResume}
            />
        );
    }

    // Fallback (shouldn't reach here)
    return (
        <div className="w-full aspect-video bg-gray-800 flex items-center justify-center">
            <div className="text-center">
                <p className="text-gray-400 mb-2">Game not available</p>
                <p className="text-gray-500 text-sm">This game is currently being updated.</p>
            </div>
        </div>
    );
};

export default GameLoader;
