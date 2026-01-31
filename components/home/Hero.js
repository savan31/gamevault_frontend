import Link from 'next/link';
import { FiPlay } from 'react-icons/fi';
import { motion } from 'framer-motion';

const resolveHeroImage = (title) => {
    if (title === 'Krunker.io') return '/Krunker.png';
    if (title === 'Pacman' || title === 'PAC MAN') return '/PAC MAN.png';
    return `/${title}.png`;
};

export default function Hero({ featuredGame }) {
    return (
        <section className="relative overflow-hidden py-12 md:py-20">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 via-transparent to-transparent" />

            <div className="container mx-auto px-4 relative">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-4">
                            Play <span className="text-gradient">Free Games</span> Instantly
                        </h1>
                        <p className="text-lg text-dark-300 mb-8 max-w-lg">
                            Play a handpicked collection of free online games—no downloads, no sign-ups. Just click and play instantly.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="#trending" className="btn-primary btn-lg gap-2">
                                <FiPlay className="w-5 h-5" />
                                Browse Games
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex gap-8 mt-10">
                            <div>
                                <div className="text-3xl font-bold text-white">1M+</div>
                                <div className="text-dark-400 text-sm">Monthly Plays</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Featured Game Preview */}
                    {featuredGame && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="hidden md:block"
                        >
                            <Link href={`/game/${featuredGame.slug}`} className="block group">
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary-500/20">
                                    <img
                                        src={resolveHeroImage(featuredGame.title)}
                                        alt={featuredGame.title}
                                        className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            if (featuredGame.thumbnail_url && e.currentTarget.src !== featuredGame.thumbnail_url) {
                                                e.currentTarget.src = featuredGame.thumbnail_url;
                                            }
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <span className="badge badge-primary mb-2">Featured Game</span>
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            {featuredGame.title}
                                        </h3>
                                        <p className="text-dark-300 line-clamp-2 mb-4">
                                            {featuredGame.description}
                                        </p>
                                        <div className="flex items-center gap-3">
                      <span className="btn-primary gap-2">
                        <FiPlay className="w-4 h-4" />
                        Play Now
                      </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}