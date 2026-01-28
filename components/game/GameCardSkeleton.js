// frontend/components/game/GameCardSkeleton.js

import Skeleton, { SkeletonText } from '../common/Skeleton';

const GameCardSkeleton = () => {
    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden">
            {/* Thumbnail skeleton */}
            <div className="relative aspect-[4/3]">
                <Skeleton className="absolute inset-0 w-full h-full" />
            </div>

            {/* Content skeleton */}
            <div className="p-3">
                {/* Title */}
                <Skeleton className="h-5 w-3/4 mb-2" />

                {/* Category and badges row */}
                <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-16" />
                    <div className="flex gap-1">
                        <Skeleton className="h-5 w-5 rounded" />
                        <Skeleton className="h-5 w-5 rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameCardSkeleton;