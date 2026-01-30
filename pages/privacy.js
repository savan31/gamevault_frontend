import Head from 'next/head';
import Layout from '@/components/common/Layout';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
        <>
            <Head>
                <title>Privacy Policy - GameVault</title>
                <meta name="description" content="GameVault Privacy Policy. Learn how we collect, use, and protect your personal information." />
            </Head>
            <Layout>
                <main className="min-h-screen bg-gray-900 py-12">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
                        <p className="text-gray-400 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
                        
                        <div className="space-y-6 text-gray-300 leading-relaxed">
                            <section className="bg-gray-800 rounded-xl p-6">
                                <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
                                <p>
                                    At GameVault, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our gaming services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                                </p>
                            </section>

                            <section className="bg-gray-800 rounded-xl p-6">
                                <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
                                <p className="mb-3">We may collect information about you in a variety of ways. The information we may collect on the site includes:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li><strong>Personal Data:</strong> Personally identifiable information, such as your name and email address, that you voluntarily give to us when you register with the site or when you choose to participate in various activities related to the site.</li>
                                    <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the site, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the site.</li>
                                    <li><strong>Gameplay Data:</strong> Information about your gaming activity, including games played, scores achieved, and time spent playing, which helps us improve our services and provide personalized recommendations.</li>
                                </ul>
                            </section>

                            <section className="bg-gray-800 rounded-xl p-6">
                                <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
                                <p className="mb-3">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the site to:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Create and manage your account</li>
                                    <li>Process your transactions and send you related information</li>
                                    <li>Email you regarding your account or order</li>
                                    <li>Fulfill and manage purchases, orders, payments, and other transactions related to the site</li>
                                    <li>Generate a personal profile about you to make future visits more personalized</li>
                                    <li>Increase the efficiency and operation of the site</li>
                                    <li>Monitor and analyze usage and trends to improve your experience</li>
                                    <li>Notify you of updates to the site</li>
                                    <li>Perform other business activities as needed</li>
                                </ul>
                            </section>

                            <section className="bg-gray-800 rounded-xl p-6">
                                <h2 className="text-2xl font-semibold text-white mb-4">Disclosure of Your Information</h2>
                                <p>
                                    We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                                    <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
                                    <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
                                    <li><strong>Advertising Partners:</strong> We may share your information with our advertising partners to deliver relevant advertisements to you and measure the effectiveness of our advertising campaigns.</li>
                                </ul>
                            </section>

                            <section className="bg-gray-800 rounded-xl p-6">
                                <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Websites</h2>
                                <p>
                                    The site may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave the site, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information.
                                </p>
                            </section>

                            <section className="bg-gray-800 rounded-xl p-6">
                                <h2 className="text-2xl font-semibold text-white mb-4">Security of Your Information</h2>
                                <p>
                                    We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                                </p>
                            </section>

                            <section className="bg-gray-800 rounded-xl p-6">
                                <h2 className="text-2xl font-semibold text-white mb-4">Policy for Children</h2>
                                <p>
                                    We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected personal information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible. If you believe we have collected information from a child under 13, please contact us immediately.
                                </p>
                            </section>

                            <section className="bg-gray-800 rounded-xl p-6">
                                <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Privacy Policy</h2>
                                <p>
                                    We may update this Privacy Policy from time to time in order to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                                </p>
                            </section>

                            <section className="bg-gray-800 rounded-xl p-6">
                                <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
                                <p>
                                    If you have questions or comments about this Privacy Policy, please contact us at our <Link href="/contact" className="text-purple-400 hover:text-purple-300 underline">contact page</Link>.
                                </p>
                            </section>
                        </div>
                    </div>
    </main>
            </Layout>
        </>
  );
}


