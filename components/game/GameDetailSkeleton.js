// frontend/components/game/GameDetailSkeleton.js

import Skeleton from '../common/Skeleton';

const GameDetailSkeleton = () => {
    return (
        <div className="min-h-screen bg-gray-900">
            {/* Game embed area skeleton */}
            <div className="bg-black">
                <div className="max-w-6xl mx-auto">
                    <Skeleton className="w-full aspect-video" />
                </div>
            </div>

            {/* Game info skeleton */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Title and meta */}
                        <div>
                            <Skeleton className="h-8 w-2/3 mb-3" />
                            <div className="flex gap-4">
                                <Skeleton className="h-6 w-24 rounded-full" />
                                <Skeleton className="h-6 w-20" />
                                <Skeleton className="h-6 w-20" />
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-3">
                            <Skeleton className="h-10 w-28 rounded-lg" />
                            <Skeleton className="h-10 w-28 rounded-lg" />
                            <Skeleton className="h-10 w-28 rounded-lg" />
                        </div>

                        {/* Description */}
                        <div className="bg-gray-800 rounded-xl p-6">
                            <Skeleton className="h-6 w-32 mb-4" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                        </div>

                        {/* Instructions */}
                        <div className="bg-gray-800 rounded-xl p-6">
                            <Skeleton className="h-6 w-36 mb-4" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Similar games */}
                    <div className="space-y-4">
                        <Skeleton className="h-6 w-32 mb-4" />
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex gap-3">
                                <Skeleton className="w-24 h-16 rounded-lg flex-shrink-0" />
                                <div className="flex-1">
                                    <Skeleton className="h-4 w-3/4 mb-2" />
                                    <Skeleton className="h-3 w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameDetailSkeleton;