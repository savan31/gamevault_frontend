import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoGameController } from 'react-icons/io5';
import { FiMenu, FiX, FiSearch } from 'react-icons/fi';
import SearchBar from '@/components/search/SearchBar';
import { SITE_CONFIG } from '@/lib/constants';
import { useTheme } from '@/contexts/ThemeContext';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/#trending', label: 'Trending' },
        { href: '/category/racing', label: 'Racing' }
    ];

    const toggleMenu = () => setIsMenuOpen((open) => !open);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 backdrop-blur border-b border-transparent bg-transparent"
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 md:h-20 gap-4">
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                            <IoGameController className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="font-bold text-white text-lg md:text-xl">{SITE_CONFIG.name}</span>
                            <span className="text-xs text-dark-400 hidden sm:block">Play free games instantly</span>
                        </div>
                    </Link>

                    {/* Desktop navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-dark-300 hover:text-white transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop search + theme toggle */}
                    <div className="hidden md:flex items-center gap-3">
                        <div className="w-72">
                            <SearchBar />
                        </div>
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-dark-800/60 text-dark-200 hover:bg-dark-700 hover:text-white transition-colors"
                            aria-label="Toggle color mode"
                        >
                            {theme === 'dark' ? '🌙' : '☀️'}
                        </button>
                    </div>

                    {/* Mobile actions */}
                    <div className="flex items-center gap-3 md:hidden">
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-dark-800 text-dark-300 hover:text-white hover:bg-dark-700 transition-colors"
                            aria-label="Toggle color mode"
                        >
                            {theme === 'dark' ? '🌙' : '☀️'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsSearchOpen((open) => !open)}
                            className="p-2 rounded-lg bg-dark-800 text-dark-300 hover:text-white hover:bg-dark-700 transition-colors"
                            aria-label="Toggle search"
                        >
                            <FiSearch className="w-5 h-5" />
                        </button>
                        <button
                            type="button"
                            onClick={toggleMenu}
                            className="p-2 rounded-lg bg-dark-800 text-dark-300 hover:text-white hover:bg-dark-700 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile search */}
                {isSearchOpen && (
                    <div className="md:hidden pb-4">
                        <SearchBar autoFocus onClose={() => setIsSearchOpen(false)} />
                    </div>
                )}
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-dark-800 bg-dark-950">
                    <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={closeMenu}
                                className="text-base font-medium text-dark-200 hover:text-white transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/contact-us"
                            onClick={closeMenu}
                            className="text-base font-medium text-dark-200 hover:text-white transition-colors"
                        >
                            Contact Us
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}

