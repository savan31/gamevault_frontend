import Link from 'next/link';
import { useCategories } from '@/hooks/useApi';
import { CATEGORY_ICONS, CATEGORY_COLORS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { Spinner } from '../common/Loader';

export default function Categories() {
    const { categories, isLoading } = useCategories();

    // Only show categories that have games and match the allowed categories
    const allowedCategorySlugs = ['shooting', 'racing', 'sport', 'sports', 'multiplayer'];
    
    const activeCategories = (categories || [])
        .filter(category => {
            const slug = category.slug?.toLowerCase() || '';
            const hasGames = (category.game_count || 0) > 0;
            const isAllowed = allowedCategorySlugs.includes(slug);
            return hasGames && isAllowed;
        })
        .sort((a, b) => (b.game_count || 0) - (a.game_count || 0)); // Sort by game count

    if (isLoading) {
        return (
            <section id="categories" className="py-12 bg-dark-800/30">
                <div className="container mx-auto px-4">
                    <h2 className="section-title">🎮 Browse by Category</h2>
                    <div className="flex justify-center">
                        <Spinner size="lg" />
                    </div>
                </div>
            </section>
        );
    }

    if (!activeCategories || activeCategories.length === 0) {
        return null;
    }

    return (
        <section id="categories" className="py-12 bg-dark-800/30">
            <div className="container mx-auto px-4">
                <h2 className="section-title">🎮 Browse by Category</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {activeCategories.map((category, index) => {
                        const slug = category.slug.toLowerCase();
                        const icon = CATEGORY_ICONS[slug] || category.icon || '🎮';
                        const gradientClass = CATEGORY_COLORS[slug] || 'from-gray-500 to-gray-600';

                        return (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                            >
                                <Link href={`/category/${category.slug}`} className="block group">
                                    <div className="card-hover p-4 text-center">
                                        <div
                                            className={`w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br ${gradientClass} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-lg`}
                                        >
                                            {icon}
                                        </div>
                                        <h3 className="font-semibold text-white group-hover:text-primary-400 transition-colors">
                                            {category.name}
                                        </h3>
                                        <p className="text-sm text-dark-400 mt-1">
                                            {category.game_count || 0} games
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}