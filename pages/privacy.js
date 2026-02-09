import Head from 'next/head';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
    const lastUpdated = "February 09, 2026";

    return (
        <>
            <Head>
                <title>Privacy Policy | GameVault - 2026 Compliant</title>
                <meta name="description" content="Read GameVault's privacy policy. Learn how we handle your data, our use of cookies for Google AdSense, and your rights under GDPR and CCPA." />
            </Head>
            <main className="min-h-screen bg-dark-950 py-12 md:py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
                        <p className="text-dark-400">Last updated: {lastUpdated}</p>
                    </div>

                    <div className="space-y-8 text-dark-300 leading-relaxed">
                        <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                            <p>
                                Welcome to GameVault. Your privacy is critically important to us. This Privacy Policy outlines the types of personal information that is received and collected by GameVault and how it is used. We comply with all 2026 international data standards, including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
                            </p>
                        </section>

                        <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
                            <p className="mb-4">We collect information to provide better services to our users. The data we collect includes:</p>
                            <ul className="list-disc list-inside space-y-3 ml-4">
                                <li><strong className="text-white">Log Data:</strong> Like many other websites, GameVault makes use of log files. These files merely log visitors to the site – usually a standard procedure for hosting companies and a part of hosting services' analytics. The information inside the log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and possibly the number of clicks.</li>
                                <li><strong className="text-white">Personal Information:</strong> We only collect personal information such as names or email addresses when voluntarily submitted by our visitors through our contact form.</li>
                            </ul>
                        </section>

                        <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 md:p-8 border-primary-500/20">
                            <h2 className="text-2xl font-bold text-white mb-4">3. Cookies and Web Beacons</h2>
                            <p className="mb-4">
                                GameVault uses cookies to store information about visitors' preferences, to record user-specific information on which pages the site visitor accesses or visits, and to personalize or customize our web page content based upon visitors' browser type or other information that the visitor sends via their browser.
                            </p>
                            <h3 className="text-xl font-semibold text-white mb-2">Google DoubleClick DART Cookie</h3>
                            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                                <li>Google, as a third-party vendor, uses cookies to serve ads on GameVault.</li>
                                <li>Google's use of the DART cookie enables it to serve ads to our site's visitors based upon their visit to GameVault and other sites on the Internet.</li>
                                <li>Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy at the following URL – <a href="https://policies.google.com/technologies/ads" className="text-primary-400 hover:underline">https://policies.google.com/technologies/ads</a></li>
                            </ul>
                        </section>

                        <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">4. Advertising Partners</h2>
                            <p className="mb-4">
                                Some of our advertising partners may use cookies and web beacons on our site. Our primary advertising partner is:
                            </p>
                            <div className="bg-dark-800 p-4 rounded-xl border border-dark-700 mb-4">
                                <p className="text-white font-bold">Google AdSense</p>
                                <p className="text-sm text-dark-400 mt-1">These third-party ad servers or ad networks use technology in their respective advertisements and links that appear on GameVault and which are sent directly to your browser. They automatically receive your IP address when this occurs.</p>
                            </div>
                            <p>
                                GameVault has no access to or control over these cookies that are used by third-party advertisers. You should consult the respective privacy policies of these third-party ad servers for more detailed information on their practices.
                            </p>
                        </section>

                        <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 md:p-8 border-secondary-500/20">
                            <h2 className="text-2xl font-bold text-white mb-4">5. Your Data Rights (GDPR & CCPA)</h2>
                            <p className="mb-4">In accordance with CCPA and GDPR regulations, you have the following rights over your data:</p>
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    { title: 'Right to Access', desc: 'You can request copies of your personal data.' },
                                    { title: 'Right to Rectification', desc: 'You can request that we correct any information you believe is inaccurate.' },
                                    { title: 'Right to Erasure', desc: 'You can request that we erase your personal data, under certain conditions.' },
                                    { title: 'Right to Object', desc: 'You have the right to object to our processing of your personal data.' }
                                ].map((right, i) => (
                                    <div key={i} className="p-4 bg-dark-800 rounded-xl">
                                        <p className="text-white font-semibold">{right.title}</p>
                                        <p className="text-sm text-dark-400">{right.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">6. Contact Information</h2>
                            <p>
                                If you require any more information or have any questions about our privacy policy, please feel free to contact us by email at <a href="mailto:privacy@gamevault.com" className="text-primary-400 hover:underline">privacy@gamevault.com</a> or via our <Link href="/contact" className="text-primary-400 hover:underline">contact page</Link>.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}
