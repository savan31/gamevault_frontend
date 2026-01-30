import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/common/Layout';

export default function AboutPage() {
    return (
        <>
            <Head>
                <title>About Us - GameVault</title>
                <meta name="description" content="Learn about GameVault, your premier destination for free HTML5 games. Discover our mission, values, and commitment to providing quality gaming experiences." />
            </Head>
            <Layout>
                <main className="min-h-screen bg-gray-900 py-12">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h1 className="text-4xl font-bold text-white mb-8">About GameVault</h1>
                        
                        <div className="space-y-6 text-gray-300 leading-relaxed">
                            <section className="bg-gray-800 rounded-xl p-6">
                                <h2 className="text-2xl font-semibold text-white mb-4">Welcome to GameVault</h2>
                                <p>
                                    GameVault is your premier destination for free, high-quality HTML5 games. We are committed to providing an exceptional gaming experience with a diverse collection of games that are playable directly in your web browser, no downloads required.
                                </p>
                                <p className="mt-4">
                                    Our platform features original and open-source games that are fully hosted on our domain, ensuring fast load times, secure gameplay, and a seamless user experience. Whether you're looking for classic arcade games, puzzle games, or action-packed adventures, GameVault has something for everyone.
                                </p>
                            </section>

                            <section className="bg-gray-800 rounded-xl p-6">
                                <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
                                <p>
                                    At GameVault, our mission is to make gaming accessible to everyone. We believe that entertainment should be free, fast, and available to all, regardless of device or location. Our carefully curated collection of HTML5 games ensures that players can enjoy quality gaming experiences without the need for expensive hardware or software installations.
                                </p>
                                <p className="mt-4">
                                    We are dedicated to maintaining a safe, secure, and user-friendly platform that complies with industry standards and best practices. Our games are optimized for both desktop and mobile devices, ensuring that you can enjoy your favorite games wherever you are.
                                </p>
                            </section>

                            <section className="bg-gray-800 rounded-xl p-6">
                                <h2 className="text-2xl font-semibold text-white mb-4">What Makes Us Different</h2>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li><strong>Locally Hosted Games:</strong> All our games are hosted directly on our servers, ensuring fast load times and reliable gameplay.</li>
                                    <li><strong>No Downloads Required:</strong> Play instantly in your browser without installing any software or plugins.</li>
                                    <li><strong>Mobile Responsive:</strong> Our games are optimized for all devices, from desktop computers to smartphones and tablets.</li>
                                    <li><strong>Original Content:</strong> We feature original and open-source games, ensuring unique and engaging experiences.</li>
                                    <li><strong>User Privacy:</strong> We respect your privacy and are committed to protecting your personal information.</li>
                                    <li><strong>Ad-Free Experience:</strong> While we may show ads to support our platform, we ensure they never interfere with your gaming experience.</li>
                                </ul>
                            </section>

                            <section className="bg-gray-800 rounded-xl p-6">
                                <h2 className="text-2xl font-semibold text-white mb-4">Our Commitment to Quality</h2>
                                <p>
                                    Quality is at the heart of everything we do at GameVault. We carefully select and test each game to ensure it meets our high standards for gameplay, graphics, and user experience. Our technical team works tirelessly to optimize game performance, fix bugs, and implement new features that enhance your gaming experience.
                                </p>
                                <p className="mt-4">
                                    We are constantly updating our game library with new titles and improvements. Your feedback is invaluable to us, and we encourage you to share your thoughts, suggestions, and report any issues you encounter. Together, we can make GameVault the best gaming platform on the web.
                                </p>
                            </section>

                            <section className="bg-gray-800 rounded-xl p-6">
                                <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
                                <p>
                                    Have questions, suggestions, or feedback? We'd love to hear from you! Visit our <Link href="/contact" className="text-purple-400 hover:text-purple-300 underline">contact page</Link> to get in touch with our team.
                                </p>
                                <p className="mt-4">
                                    For legal inquiries, please review our <Link href="/privacy" className="text-purple-400 hover:text-purple-300 underline">Privacy Policy</Link> and <Link href="/terms" className="text-purple-400 hover:text-purple-300 underline">Terms of Service</Link>.
                                </p>
                            </section>
                        </div>

                        <div className="mt-8 text-center">
                            <Link
                                href="/"
                                className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
                            >
                                Start Playing Games
                            </Link>
                        </div>
                    </div>
                </main>
            </Layout>
        </>
    );
}

