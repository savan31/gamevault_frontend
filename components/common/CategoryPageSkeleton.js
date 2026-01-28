// frontend/components/common/CategoryPageSkeleton.js

import Skeleton from './Skeleton';
import GameGridSkeleton from '../game/GameGridSkeleton';

const CategoryPageSkeleton = () => {
    return (
        <div className="min-h-screen bg-gray-900 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header skeleton */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Skeleton className="h-10 w-10 rounded-lg" />
                        <Skeleton className="h-8 w-48" />
                    </div>
                    <Skeleton className="h-5 w-96 max-w-full" />
                </div>

                {/* Games count */}
                <Skeleton className="h-5 w-24 mb-6" />

                {/* Game grid skeleton */}
                <GameGridSkeleton count={12} />
            </div>
        </div>
    );
};

export default CategoryPageSkeleton;