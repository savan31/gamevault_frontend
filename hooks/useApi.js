// frontend/hooks/useApi.js

import useSWR from 'swr';
import { gamesApi, categoriesApi } from '../lib/api';

// The axios interceptor returns response.data which is { success, data, message }
// So we need to extract the .data property from that
const fetcher = async (apiCall) => {
    const response = await apiCall;
    // response is already { success, data, message } due to axios interceptor
    return response;
};

export function useGames(params = {}) {
    const { data, error, isLoading, mutate } = useSWR(
        ['games', JSON.stringify(params)],
        () => fetcher(gamesApi.getAll(params)),
        {
            revalidateOnFocus: false,
            dedupingInterval: 60000
        }
    );

    // Extract games from response { success, data, message }
    const games = data?.data || data?.games || (Array.isArray(data) ? data : []);

    return {
        games,
        isLoading,
        isError: error,
        mutate
    };
}

export function useGame(slug) {
    const { data, error, isLoading } = useSWR(
        slug ? ['game', slug] : null,
        () => fetcher(gamesApi.getBySlug(slug)),
        {
            revalidateOnFocus: false,
            dedupingInterval: 60000
        }
    );

    // Single game response
    const game = data?.data || data;

    return {
        game,
        isLoading,
        isError: error
    };
}

export function useFeaturedGames(limit = 6) {
    const { data, error, isLoading } = useSWR(
        ['featured', limit],
        () => fetcher(gamesApi.getFeatured(limit)),
        {
            revalidateOnFocus: true,
            dedupingInterval: 0,
            revalidateOnMount: true
        }
    );

    const games = data?.data || data?.games || (Array.isArray(data) ? data : []);

    return {
        games,
        isLoading,
        isError: error
    };
}

export function useTrendingGames(limit = 12) {
    const { data, error, isLoading } = useSWR(
        ['trending', limit],
        () => fetcher(gamesApi.getTrending(limit)),
        {
            revalidateOnFocus: true,
            dedupingInterval: 0,
            revalidateOnMount: true
        }
    );

    const games = data?.data || data?.games || (Array.isArray(data) ? data : []);

    return {
        games,
        isLoading,
        isError: error
    };
}

export function useNewGames(limit = 12) {
    const { data, error, isLoading } = useSWR(
        ['new', limit],
        () => fetcher(gamesApi.getNew(limit)),
        {
            revalidateOnFocus: false,
            dedupingInterval: 300000
        }
    );

    const games = data?.data || data?.games || (Array.isArray(data) ? data : []);

    return {
        games,
        isLoading,
        isError: error
    };
}

export function useSimilarGames(slug, limit = 6) {
    const { data, error, isLoading } = useSWR(
        slug ? ['similar', slug, limit] : null,
        () => fetcher(gamesApi.getSimilar(slug, limit)),
        {
            revalidateOnFocus: false,
            dedupingInterval: 300000
        }
    );

    const games = data?.data || data?.games || (Array.isArray(data) ? data : []);

    return {
        games,
        isLoading,
        isError: error
    };
}

export function useCategories() {
    const { data, error, isLoading } = useSWR(
        'categories',
        () => fetcher(categoriesApi.getAll()),
        {
            revalidateOnFocus: false,
            dedupingInterval: 600000
        }
    );

    // API returns { success, data: [...categories], message }
    const categories = data?.data || data?.categories || (Array.isArray(data) ? data : []);

    return {
        categories,
        isLoading,
        isError: error
    };
}

export function useCategory(slug, params = {}) {
    const { data, error, isLoading } = useSWR(
        slug ? ['category', slug, JSON.stringify(params)] : null,
        () => fetcher(categoriesApi.getBySlug(slug, params)),
        {
            revalidateOnFocus: false,
            dedupingInterval: 60000
        }
    );

    // Response structure: { success, data: { category, games }, message }
    const responseData = data?.data || data;
    const category = responseData?.category || responseData;
    const games = responseData?.games || [];

    return {
        category,
        games,
        isLoading,
        isError: error
    };
}

export function useSearch(query) {
    const { data, error, isLoading } = useSWR(
        query && query.length >= 2 ? ['search', query] : null,
        () => fetcher(gamesApi.search(query)),
        {
            revalidateOnFocus: false,
            dedupingInterval: 30000
        }
    );

    const results = data?.data || data?.games || (Array.isArray(data) ? data : []);

    return {
        results,
        isLoading,
        isError: error
    };
}