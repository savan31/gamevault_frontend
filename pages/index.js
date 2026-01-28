import { useRouter } from 'next/router';
import SEO from '@/components/common/SEO';
import Hero from '@/components/home/Hero';
import TrendingGames from '@/components/home/TrendingGames';
import Categories from '@/components/home/Categories';
import { useFeaturedGames } from '@/hooks/useApi';

export default function HomePage() {
    const router = useRouter();
    const { search = '', sortBy, featured } = router.query;

    const { games: featuredGames } = useFeaturedGames(1);
    const heroGame = featuredGames && featuredGames.length > 0 ? featuredGames[0] : null;

    const pageTitle = search
        ? `Search results for "${search}"`
        : sortBy === 'plays'
            ? 'Trending Games'
            : undefined;

    return (
        <>
            <SEO title={pageTitle} />
            <Hero featuredGame={heroGame} />
            <TrendingGames />
            <Categories />
        </>
    );
}


