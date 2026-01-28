import axios from 'axios';
import { SITE_CONFIG } from './constants';

const api = axios.create({
    baseURL: SITE_CONFIG.apiUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        const message = error.response?.data?.error?.message || error.message || 'Something went wrong';
        console.error('API Error:', message);
        return Promise.reject(new Error(message));
    }
);

// Games API
export const gamesApi = {
    getAll: (params = {}) => api.get('/games', { params }),
    getBySlug: (slug) => api.get(`/games/${slug}`),
    getFeatured: (limit = 6) => api.get('/games/featured', { params: { limit } }),
    getTrending: (limit = 12) => api.get('/games/trending', { params: { limit } }),
    getNew: (limit = 12) => api.get('/games/new', { params: { limit } }),
    getSimilar: (slug, limit = 6) => api.get(`/games/${slug}/similar`, { params: { limit } }),
    search: (query, limit = 20) => api.get('/games/search', { params: { q: query, limit } }),
    incrementPlays: (slug, sessionId) => api.post(`/games/${slug}/play`, { sessionId }),
    getSitemap: () => api.get('/games/sitemap')
};

// Categories API
export const categoriesApi = {
    getAll: () => api.get('/categories'),
    getBySlug: (slug, params = {}) => api.get(`/categories/${slug}`, { params }),
    getGames: (slug, params = {}) => api.get(`/categories/${slug}/games`, { params })
};

// Analytics API
export const analyticsApi = {
    track: (data) => api.post('/analytics/track', data),
    getGameStats: (slug, days = 30) => api.get(`/analytics/game/${slug}`, { params: { days } }),
    getTopGames: (days = 7, limit = 10) => api.get('/analytics/top', { params: { days, limit } })
};

export default api;