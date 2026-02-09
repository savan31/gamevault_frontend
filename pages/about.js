import Head from 'next/head';
import Link from 'next/link';
import { FiTarget, FiSmartphone, FiShield, FiCpu } from 'react-icons/fi';

export default function AboutPage() {
    return (
        <>
            <Head>
                <title>About Us | GameVault - Leading Editorial Gaming Platform</title>
                <meta name="description" content="Discover the mission behind GameVault. We provide expert-curated HTML5 games, detailed strategy guides, and high-performance browser gaming experiences." />
            </Head>
            <main className="min-h-screen bg-dark-950 py-12 md:py-24">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                            The <span className="text-gradient">Future</span> of Browser Gaming
                        </h1>
                        <p className="text-dark-400 text-xl max-w-2xl mx-auto leading-relaxed">
                            GameVault is an editorial gaming platform dedicated to archiving, reviewing, and optimizing the finest HTML5 games for the modern web.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-20">
                        <section className="bg-dark-900 border border-dark-800 rounded-3xl p-8 md:p-10 hover:border-primary-500/30 transition-all duration-500">
                            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
                            <p className="text-dark-300 text-lg mb-4">
                                Founded in 2026, GameVault was built on a single premise: <span className="text-white italic">Gaming should be instant, free, and high-quality.</span>
                            </p>
                            <p className="text-dark-300">
                                We bridge the gap between complex AAA titles and simple browser fun. Our experts meticulously audit every game in our repository for performance, security, and mechanical depth. We don't just host games; we provide the strategy and context needed to master them.
                            </p>
                        </section>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: FiTarget, title: 'Precision', desc: 'Expert-curated game selections.' },
                                { icon: FiSmartphone, title: 'Mobile', desc: 'Optimized for all screen sizes.' },
                                { icon: FiShield, title: 'Safe', desc: 'Secure, sandboxed environments.' },
                                { icon: FiCpu, title: 'Fast', desc: 'Low-latency, high-FPS engine.' }
                            ].map((feature, i) => (
                                <div key={i} className="bg-dark-900/40 border border-dark-800 rounded-2xl p-6 flex flex-col justify-center text-center">
                                    <feature.icon className="w-8 h-8 text-primary-500 mx-auto mb-3" />
                                    <h3 className="text-white font-bold mb-1">{feature.title}</h3>
                                    <p className="text-xs text-dark-400">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <section className="bg-gradient-to-br from-dark-900 to-dark-800 border border-dark-800 rounded-3xl p-8 md:p-12 mb-20 shadow-2xl">
                        <h2 className="text-3xl font-bold text-white mb-8 text-center italic">"More Than Just a Repository"</h2>
                        <div className="space-y-6 text-dark-300 text-lg">
                            <p>
                                Unlike generic "play now" sites, GameVault provides a comprehensive editorial layer. For every title, our team produces in-depth guides, mechanical reviews, and advanced strategy analyses. This ensures our community doesn't just play—they improve.
                            </p>
                            <p>
                                We comply with the latest 2026 web standards, ensuring that our site is lightweight, accessible, and respectful of user privacy. Our platform is a safe haven for gamers of all ages to discover the next generation of web-based entertainment.
                            </p>
                        </div>
                    </section>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link href="/" className="btn-primary btn-lg min-w-[200px] text-center">
                            Explore Games
                        </Link>
                        <Link href="/contact" className="text-dark-400 hover:text-white transition-colors py-3 px-6 border border-dark-800 rounded-xl hover:bg-dark-800">
                            Partner with Us
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
