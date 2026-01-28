export const SITE_CONFIG = {
    name: process.env.NEXT_PUBLIC_SITE_NAME || 'GameVault',
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Play free online games instantly in your browser',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
    adsenseId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '',
    gaId: process.env.NEXT_PUBLIC_GA_TRACKING_ID || ''
};

export const CATEGORY_ICONS = {
    action: '⚔️',
    puzzle: '🧩',
    racing: '🏎️',
    sports: '⚽',
    adventure: '🗺️',
    arcade: '👾',
    strategy: '♟️',
    multiplayer: '👥',
    casual: '🎈',
    shooting: '🎯'
};

export const CATEGORY_COLORS = {
    action: 'from-red-500 to-orange-500',
    puzzle: 'from-purple-500 to-pink-500',
    racing: 'from-yellow-500 to-amber-500',
    sports: 'from-green-500 to-emerald-500',
    adventure: 'from-blue-500 to-cyan-500',
    arcade: 'from-pink-500 to-rose-500',
    strategy: 'from-indigo-500 to-violet-500',
    multiplayer: 'from-teal-500 to-cyan-500',
    casual: 'from-orange-500 to-yellow-500',
    shooting: 'from-red-600 to-red-500'
};

export const DEFAULT_META = {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    openGraph: {
        type: 'website',
        locale: 'en_US',
        site_name: SITE_CONFIG.name
    },
    twitter: {
        cardType: 'summary_large_image'
    }
};

export const ITEMS_PER_PAGE = 20;

export const GAME_ASPECT_RATIO = 16 / 9;

export const AD_SLOTS = {
    HEADER: 'header-banner',
    SIDEBAR: 'sidebar',
    GAME_PAGE: 'game-page',
    PREROLL: 'preroll',
    BETWEEN_GAMES: 'between-games'
};