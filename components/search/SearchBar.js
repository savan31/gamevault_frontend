import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiSearch, FiX } from 'react-icons/fi';
import { useSearch } from '@/hooks/useApi';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchBar({ autoFocus = false, onClose }) {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const { results, isLoading } = useSearch(query);
    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        setIsOpen(query.length >= 2);
    }, [query]);

    useEffect(() => {
        setQuery('');
        setIsOpen(false);
    }, [router.asPath]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/?search=${encodeURIComponent(query.trim())}`);
            setIsOpen(false);
            onClose?.();
        }
    };

    const handleGameClick = () => {
        setQuery('');
        setIsOpen(false);
        onClose?.();
    };

    return (
        <div ref={containerRef} className="relative">
            <form onSubmit={handleSubmit}>
                <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search games..."
                        className="input pl-10 pr-10"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => setQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400 hover:text-white"
                        >
                            <FiX className="w-5 h-5" />
                        </button>
                    )}
                </div>
            </form>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-dark-800 border border-dark-700 rounded-xl shadow-xl overflow-hidden z-50"
                    >
                        {isLoading ? (
                            <div className="p-4 text-center text-dark-400">
                                Searching...
                            </div>
                        ) : results.length > 0 ? (
                            <div className="max-h-80 overflow-y-auto">
                                {results.slice(0, 8).map((game) => (
                                    <Link
                                        key={game.id}
                                        href={`/game/${game.slug}`}
                                        onClick={handleGameClick}
                                        className="flex items-center gap-3 p-3 hover:bg-dark-700 transition-colors"
                                    >
                                        <img
                                            src={game.thumbnail_url}
                                            alt={game.title}
                                            className="w-12 h-12 rounded-lg object-cover"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-white truncate">
                                                {game.title}
                                            </p>
                                            <p className="text-sm text-dark-400 truncate">
                                                {game.category_name}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                                {results.length > 8 && (
                                    <button
                                        onClick={handleSubmit}
                                        className="w-full p-3 text-center text-primary-400 hover:bg-dark-700 transition-colors"
                                    >
                                        View all {results.length} results
                                    </button>
                                )}
                            </div>
                        ) : query.length >= 2 ? (
                            <div className="p-4 text-center text-dark-400">
                                No games found for "{query}"
                            </div>
                        ) : null}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}