import Link from 'next/link';
import { IoGameController } from 'react-icons/io5';
import { FiGithub, FiTwitter, FiMail } from 'react-icons/fi';
import { SITE_CONFIG } from '@/lib/constants';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        browse: [
            { href: '/', label: 'All Games' },
            { href: '/category/action', label: 'Action' },
            { href: '/category/puzzle', label: 'Puzzle' },
            { href: '/category/racing', label: 'Racing' },
            { href: '/category/sports', label: 'Sports' }
        ],
        categories: [
            { href: '/category/adventure', label: 'Adventure' },
            { href: '/category/arcade', label: 'Arcade' },
            { href: '/category/strategy', label: 'Strategy' },
            { href: '/category/multiplayer', label: 'Multiplayer' },
            { href: '/category/casual', label: 'Casual' }
        ],
        company: [
            { href: '/about', label: 'About Us' },
            { href: '/contact', label: 'Contact' },
            { href: '/privacy', label: 'Privacy Policy' },
            { href: '/terms', label: 'Terms of Service' }
        ]
    };

    return (
        <footer className="bg-dark-950 border-t border-dark-800">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                                <IoGameController className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold font-display text-white">
                {SITE_CONFIG.name}
              </span>
                        </Link>
                        <p className="text-dark-400 text-sm mb-4">
                            Play a handpicked collection of free online games—no downloads, no sign-ups. Just click and play instantly.
                        </p>
                        <div className="flex items-center gap-3">
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-dark-800 text-dark-400 hover:text-white hover:bg-dark-700 transition-colors"
                                aria-label="Twitter"
                            >
                                <FiTwitter className="w-5 h-5" />
                            </a>
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-dark-800 text-dark-400 hover:text-white hover:bg-dark-700 transition-colors"
                                aria-label="GitHub"
                            >
                                <FiGithub className="w-5 h-5" />
                            </a>
                            <a
                                href="mailto:contact@gamevault.com"
                                className="p-2 rounded-lg bg-dark-800 text-dark-400 hover:text-white hover:bg-dark-700 transition-colors"
                                aria-label="Email"
                            >
                                <FiMail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Browse */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Browse</h3>
                        <ul className="space-y-2">
                            {footerLinks.browse.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-dark-400 hover:text-primary-400 transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Categories</h3>
                        <ul className="space-y-2">
                            {footerLinks.categories.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-dark-400 hover:text-primary-400 transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold text-white mb-4">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-dark-400 hover:text-primary-400 transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-dark-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-dark-500 text-sm">
                        © {currentYear} {SITE_CONFIG.name}. All rights reserved.
                    </p>
                    <p className="text-dark-500 text-sm">
                        Made with love for gamers everywhere
                    </p>
                </div>
            </div>
        </footer>
    );
}