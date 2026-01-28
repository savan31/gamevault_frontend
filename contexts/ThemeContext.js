import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
    theme: 'dark',
    toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');

    // Load initial theme from localStorage or system preference
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const stored = window.localStorage.getItem('theme');
        if (stored === 'light' || stored === 'dark') {
            setTheme(stored);
        } else {
            const prefersDark = window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(prefersDark ? 'dark' : 'light');
        }
    }, []);

    // Apply theme to <html> and persist
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const root = document.documentElement;
        root.dataset.theme = theme;
        window.localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);


