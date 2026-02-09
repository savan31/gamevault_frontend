// frontend/pages/category/[slug].js

import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import GameGrid from '../../components/game/GameGrid';
import { useCategory } from '../../hooks/useApi';
import { SITE_CONFIG } from '../../lib/constants';

// Skeleton
const CategoryPageSkeleton = () => (
    <div className="min-h-screen bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4">
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 bg-gray-700 rounded-lg animate-pulse" />
                    <div className="h-8 w-48 bg-gray-700 rounded animate-pulse" />
                </div>
                <div className="h-5 w-96 max-w-full bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="h-5 w-24 bg-gray-700 rounded mb-6 animate-pulse" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="bg-gray-800 rounded-xl overflow-hidden">
                        <div className="aspect-[4/3] bg-gray-700 animate-pulse" />
                        <div className="p-3 space-y-2">
                            <div className="h-5 w-3/4 bg-gray-700 rounded animate-pulse" />
                            <div className="h-4 w-16 bg-gray-700 rounded animate-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default function CategoryPage({ category: initialCategory, games: initialGames }) {
    const router = useRouter();
    const { slug } = router.query;

    const { category: fetchedCategory, games: fetchedGames, isLoading, isError } = useCategory(slug);

    const category = initialCategory || fetchedCategory;
    const games = initialGames?.length > 0 ? initialGames : fetchedGames;
    const loading = !initialCategory && isLoading;

    if (router.isFallback || loading) {
        return <CategoryPageSkeleton />;
    }

    if (isError || !category) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">📁</div>
                    <h1 className="text-2xl font-bold text-white mb-2">Category Not Found</h1>
                    <p className="text-gray-400 mb-4">This category doesn&apos;t exist.</p>
                    <Link
                        href="/"
                        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors inline-block"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>{category.name} Games - {SITE_CONFIG.name}</title>
                <meta
                    name="description"
                    content={`Play free ${category.name} games online at ${SITE_CONFIG.name}. ${category.description || ''}`}
                />
            </Head>

            <div className="min-h-screen bg-gray-900 py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-4xl">{category.icon}</span>
                            <h1 className="text-3xl font-bold text-white">{category.name} Games</h1>
                        </div>
                        {category.description && <p className="text-gray-400">{category.description}</p>}
                    </div>

                    <p className="text-gray-500 mb-6">{games?.length || 0} games</p>

                    <GameGrid games={games || []} loading={false} />
                </div>
            </div>
        </>
    );
}

export async function getStaticPaths() {
    const API_URL = SITE_CONFIG.apiUrl;

    try {
        const res = await fetch(`${API_URL}/categories`);
        if (!res.ok) return { paths: [], fallback: true };

        const json = await res.json();
        // Handle { success: true, data: [...] } structure
        const categories = Array.isArray(json) ? json : (json.data || json.categories || []);

        const paths = categories.map((cat) => ({ params: { slug: cat.slug } }));
        console.log(`✅ Generated ${paths.length} category paths`);

        return { paths, fallback: true };
    } catch (err) {
        console.error('❌ Error generating category paths:', err.message);
        return { paths: [], fallback: true };
    }
}

export async function getStaticProps({ params }) {
    const API_URL = SITE_CONFIG.apiUrl;

    try {
        const res = await fetch(`${API_URL}/categories/${params.slug}`);

        // If API returns 404 or other error
        if (!res.ok) {
            console.error(`Error fetching category ${params.slug}: Status ${res.status}`);
            return { notFound: true };
        }

        const json = await res.json();

        // Extract category data from response { success: true, data: { ...category, games: [...] } }
        const categoryData = json.data || json;

        if (!categoryData) {
            return { notFound: true };
        }

        // Separate games from category if needed, though categoryData includes it
        const games = categoryData.games || [];

        return {
            props: {
                category: categoryData,
                games
            },
            revalidate: 60,
        };
    } catch (err) {
        console.error('Error fetching category:', err.message);
        return { notFound: true };
    }
}