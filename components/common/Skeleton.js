// frontend/components/common/Skeleton.js

const Skeleton = ({ className = '', variant = 'rectangular', animation = 'pulse' }) => {
    const baseClasses = 'bg-gray-700';

    const animationClasses = {
        pulse: 'animate-pulse',
        shimmer: 'skeleton-shimmer',
        none: ''
    };

    const variantClasses = {
        rectangular: 'rounded-lg',
        circular: 'rounded-full',
        text: 'rounded h-4'
    };

    return (
        <div
            className={`
        ${baseClasses}
        ${animationClasses[animation]}
        ${variantClasses[variant]}
        ${className}
      `}
        />
    );
};

// Preset skeleton components
export const SkeletonText = ({ lines = 1, className = '' }) => (
    <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
            <Skeleton
                key={i}
                variant="text"
                className={`h-4 ${i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'}`}
            />
        ))}
    </div>
);

export const SkeletonCircle = ({ size = 40, className = '' }) => (
    <Skeleton
        variant="circular"
        className={className}
        style={{ width: size, height: size }}
    />
);

export const SkeletonImage = ({ className = '' }) => (
    <Skeleton variant="rectangular" className={`w-full aspect-video ${className}`} />
);

export default Skeleton;