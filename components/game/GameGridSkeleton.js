// frontend/components/game/GameGridSkeleton.js

import GameCardSkeleton from './GameCardSkeleton';

const GameGridSkeleton = ({ count = 12 }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: count }).map((_, index) => (
                <GameCardSkeleton key={index} />
            ))}
        </div>
    );
};

export default GameGridSkeleton;