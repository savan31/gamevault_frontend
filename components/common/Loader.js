import { motion } from 'framer-motion';

export function Spinner({ size = 'md', className = '' }) {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    };

    return (
        <div className={`${sizes[size]} ${className}`}>
            <motion.div
                className="w-full h-full border-2 border-dark-700 border-t-primary-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
        </div>
    );
}

/**
 * Enhanced Shimmering Skeleton for Game Cards
 * Provides a premium "moving highlight" effect (shimmer)
 */
export function GameCardSkeleton() {
    return (
        <div className="bg-dark-800 rounded-xl overflow-hidden shadow-lg border border-dark-700/50 relative">
            {/* Shimmer overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                <motion.div
                    className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent shadow-[0_0_100px_50px_rgba(255,255,255,0.05)]"
                    initial={{ x: '-150%' }}
                    animate={{ x: '150%' }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                />
            </div>

            {/* Content Mockup */}
            <div className="aspect-video bg-dark-700" />
            <div className="p-3 space-y-3">
                <div className="h-4 bg-dark-700 rounded w-3/4" />
                <div className="flex items-center justify-between">
                    <div className="h-3 bg-dark-700 rounded w-1/3" />
                    <div className="h-4 w-4 bg-dark-700 rounded-full" />
                </div>
            </div>
        </div>
    );
}

export function GameGridSkeleton({ count = 12, columns = 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6' }) {
    return (
        <div className={`grid ${columns} gap-4`}>
            {Array.from({ length: count }).map((_, i) => (
                <GameCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function PageLoader() {
    return (
        <div className="fixed inset-0 bg-dark-950 flex items-center justify-center z-50">
            <div className="text-center">
                <div className="relative mb-6">
                    <Spinner size="xl" className="mx-auto" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-primary-500 text-xs font-bold animate-pulse">GV</span>
                    </div>
                </div>
                <p className="text-white font-medium tracking-widest text-sm uppercase">Loading GameVault</p>
                <div className="mt-4 w-48 h-1 bg-dark-800 rounded-full overflow-hidden mx-auto">
                    <motion.div
                        className="h-full bg-primary-500"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Spinner;