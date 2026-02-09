import Head from 'next/head';
import Link from 'next/link';

export default function TermsPage() {
    return (
        <>
            <Head>
                <title>Terms of Service - GameVault</title>
                <meta name="description" content="GameVault Terms of Service. Read our terms and conditions for using our gaming platform." />
            </Head>
            <main className="min-h-screen bg-dark-950 py-12 md:py-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
                        <p className="text-dark-400">Last updated: {new Date().toLocaleDateString()}</p>
                    </div>

                    <div className="space-y-8 text-dark-300 leading-relaxed">
                        <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Agreement to Terms</h2>
                            <p>
                                By accessing or using GameVault, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.
                            </p>
                        </section>

                        <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Use License</h2>
                            <p className="mb-3">Permission is granted to temporarily access the materials on GameVault for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Modify or copy the materials</li>
                                <li>Use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                                <li>Attempt to decompile or reverse engineer any software contained on GameVault</li>
                                <li>Remove any copyright or other proprietary notations from the materials</li>
                                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                            </ul>
                            <p className="mt-4">
                                This license shall automatically terminate if you violate any of these restrictions and may be terminated by GameVault at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
                            </p>
                        </section>

                        <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">User Accounts</h2>
                            <p>
                                When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account. You agree not to disclose your password to any third party and to take sole responsibility for any activities or actions under your account.
                            </p>
                        </section>

                        <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Prohibited Uses</h2>
                            <p className="mb-3">You may use GameVault only for lawful purposes and in accordance with these Terms. You agree not to use the site:</p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>In any way that violates any applicable federal, state, local, or international law or regulation</li>
                                <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
                                <li>To impersonate or attempt to impersonate the company, a company employee, another user, or any other person or entity</li>
                                <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful</li>
                                <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the site</li>
                            </ul>
                        </section>

                        <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property Rights</h2>
                            <p>
                                The site and its original content, features, and functionality are and will remain the exclusive property of GameVault and its licensors. The site is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
                            </p>
                        </section>

                        <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Disclaimer</h2>
                            <p>
                                The materials on GameVault are provided on an 'as is' basis. GameVault makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                            </p>
                        </section>

                        <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Limitations</h2>
                            <p>
                                In no event shall GameVault or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on GameVault, even if GameVault or a GameVault authorized representative has been notified orally or in writing of the possibility of such damage.
                            </p>
                        </section>

                        <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Revisions and Errata</h2>
                            <p>
                                The materials appearing on GameVault could include technical, typographical, or photographic errors. GameVault does not warrant that any of the materials on its website are accurate, complete, or current. GameVault may make changes to the materials contained on its website at any time without notice.
                            </p>
                        </section>

                        <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Links</h2>
                            <p>
                                GameVault has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by GameVault of the site. Use of any such linked website is at the user's own risk.
                            </p>
                        </section>

                        <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-white mb-4">Modifications</h2>
                            <p>
                                GameVault may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
                            </p>
                        </section>

                        <section className="bg-dark-900/50 border border-dark-800 rounded-2xl p-6 md:p-8 border-primary-500/20">
                            <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                            <p>
                                If you have any questions about these Terms of Service, please contact us via our <Link href="/contact-us" className="text-primary-400 hover:text-primary-500 underline">contact page</Link>.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
        </>
    );
}


