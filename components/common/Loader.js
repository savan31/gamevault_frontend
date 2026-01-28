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

export function GameCardSkeleton() {
    return (
        <div className="card animate-pulse">
            <div className="aspect-video bg-dark-700" />
            <div className="p-4 space-y-3">
                <div className="h-5 bg-dark-700 rounded w-3/4" />
                <div className="h-4 bg-dark-700 rounded w-1/2" />
            </div>
        </div>
    );
}

export function GameGridSkeleton({ count = 6 }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <GameCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function PageLoader() {
    return (
        <div className="fixed inset-0 bg-dark-900 flex items-center justify-center z-50">
            <div className="text-center">
                <Spinner size="xl" className="mx-auto mb-4" />
                <p className="text-dark-400">Loading...</p>
            </div>
        </div>
    );
}

export default Spinner;