import Link from 'next/link';
import SEO from '@/components/common/SEO';
import { FiHome, FiSearch } from 'react-icons/fi';

export default function NotFoundPage() {
    return (
        <>
            <SEO title="Page Not Found" noindex />

            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="text-center px-4">
                    {/* 404 Animation */}
                    <div className="text-8xl md:text-9xl font-bold text-gradient mb-4">
                        404
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Oops! Page Not Found
                    </h1>

                    <p className="text-dark-400 mb-8 max-w-md mx-auto">
                        The page you're looking for doesn't exist or has been moved.
                        Let's get you back to playing games!
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link href="/" className="btn-primary btn-lg gap-2">
                            <FiHome className="w-5 h-5" />
                            Go Home
                        </Link>
                        <Link href="/#categories" className="btn-secondary btn-lg gap-2">
                            <FiSearch className="w-5 h-5" />
                            Browse Games
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}