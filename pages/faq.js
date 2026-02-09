import Head from 'next/head';
import { FiChevronDown } from 'react-icons/fi';
import { useState } from 'react';

const FAQ_ITEMS = [
  {
    q: "Are the games on GameVault really free?",
    a: "Yes! All games hosted on GameVault are 100% free to play. We do not require any subscriptions or hidden fees. We partner with developers to provide quality entertainment at no cost to you."
  },
  {
    q: "Do I need to download anything to play?",
    a: "No downloads are necessary. All our games run directly in your web browser using HTML5 technology. This means you can play instantly on your PC, tablet, or smartphone."
  },
  {
    q: "Is my progress saved?",
    a: "Progress saving depends on the specific game. Many of our games use local storage to save your progress on your device, while others may require you to reach certain milestones in a single session."
  },
  {
    q: "How often are new games added?",
    a: "Our team curates and adds new high-quality games every week. We focus on games that are fun, safe, and perform well across all devices."
  },
  {
    q: "I'm a developer. Can I submit my game?",
    a: "Absolutely! We love supporting indie developers. Please reach out to us via our contact page with a link to your game and a brief description. Our team will review it within 48-72 hours."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <>
      <Head>
        <title>FAQ - Frequently Asked Questions | GameVault</title>
        <meta name="description" content="Find answers to common questions about GameVault, browser games, and how to play for free." />
      </Head>
      <main className="min-h-screen bg-dark-950 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
            <p className="text-dark-400 text-lg">Everything you need to know about GameVault.</p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="bg-dark-900 border border-dark-800 rounded-2xl overflow-hidden transition-all">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-dark-800 transition-colors"
                >
                  <span className="text-white font-semibold pr-4">{item.q}</span>
                  <FiChevronDown className={`w-5 h-5 text-primary-500 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
                </button>
                {openIndex === i && (
                  <div className="px-6 pb-6 pt-0 text-dark-300 leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="w-full h-px bg-dark-800 mb-6" />
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 border border-primary-500/20 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
            <p className="text-dark-300 mb-6">We're here to help! Send us a message and we'll get back to you as soon as possible.</p>
            <a href="/contact" className="btn-primary inline-flex">Contact Support</a>
          </div>
        </div>
      </main>
    </>
  );
}
