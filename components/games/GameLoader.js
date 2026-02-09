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

const GameLoader = ({ game, onGameStart, onGameOver, onGamePause, onGameResume }) =& gt; {
    if (!game) {
        return (
            & lt;div className = "w-full aspect-video bg-gray-800 flex items-center justify-center" & gt;
                & lt;p className = "text-gray-400" & gt;Loading game...& lt;/p&gt;
            & lt;/div&gt;
        );
    }

    // Check if this is a local game by game_type or game_url or isDemoGame flag
    const isLocalGame = game.game_type === 'local' ||
        game.isDemoGame === true ||
        (game.game_url & amp;& amp; game.game_url.startsWith('local://'));

    // Get game component by slug
    const gameSlug = game.slug?.toLowerCase() || '';
    const GameComponent = GAME_COMPONENTS[gameSlug];

    // If it's marked as local but we don't have a component, show error
    if (isLocalGame & amp;& amp; !GameComponent) {
        return (
            & lt;div className = "w-full aspect-video bg-gray-800 flex items-center justify-center" & gt;
                & lt;div className = "text-center" & gt;
                    & lt;p className = "text-gray-400 mb-2" & gt;Local game not implemented & lt;/p&gt;
                    & lt;p className = "text-gray-500 text-sm" & gt;This game is marked as local but the component is missing.& lt;/p&gt;
                & lt;/div&gt;
            & lt;/div&gt;
        );
    }

    // If it's not a local game, return null (GameEmbed will handle iframe)
    if (!isLocalGame) {
        return null;
    }

    // If we have a component, render it
    if (GameComponent) {
        return (
            & lt; GameComponent
        onGameStart = { onGameStart }
        onGameOver = { onGameOver }
        onGamePause = { onGamePause }
        onGameResume = { onGameResume }
            /& gt;
        );
    }

    // Fallback (shouldn't reach here)
    return (
        & lt;div className = "w-full aspect-video bg-gray-800 flex items-center justify-center" & gt;
            & lt;div className = "text-center" & gt;
                & lt;p className = "text-gray-400 mb-2" & gt;Game not available & lt;/p&gt;
                & lt;p className = "text-gray-500 text-sm" & gt;This game is currently being updated.& lt;/p&gt;
            & lt;/div&gt;
        & lt;/div&gt;
    );
};

export default GameLoader;
