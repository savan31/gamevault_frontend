import Head from 'next/head';
import { FiMail, FiMessageCircle, FiMapPin } from 'react-icons/fi';

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact Us - GameVault</title>
        <meta name="description" content="Reach out to the GameVault team for support, feedback, or business inquiries." />
      </Head>
      <main className="min-h-screen bg-dark-950 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get in Touch</h1>
            <p className="text-dark-400 text-lg">Have a question or feedback? We'd love to hear from you.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: FiMail, title: 'Email Us', contact: 'support@gamevault.com', sub: 'We respond within 24h' },
              { icon: FiMessageCircle, title: 'Live Chat', contact: '@gamevault_app', sub: 'Follow us on Twitter' },
              { icon: FiMapPin, title: 'Location', contact: 'Worldwide', sub: 'Cloud-based gaming' }
            ].map((item, i) => (
              <div key={i} className="bg-dark-900/50 border border-dark-800 p-8 rounded-2xl text-center group hover:border-primary-500/30 transition-colors">
                <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-primary-400 font-medium mb-1">{item.contact}</p>
                <p className="text-dark-400 text-sm">{item.sub}</p>
              </div>
            ))}
          </div>

          <div className="bg-dark-900 border border-dark-800 rounded-2xl p-8 md:p-12">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-dark-300">Your Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-dark-800 border-dark-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-dark-300">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-dark-800 border-dark-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-300">Subject</label>
                <input type="text" placeholder="How can we help?" className="w-full bg-dark-800 border-dark-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-dark-300">Message</label>
                <textarea rows="5" placeholder="Tell us more about your inquiry..." className="w-full bg-dark-800 border-dark-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 transition-all"></textarea>
              </div>
              <button className="btn-primary w-full py-4 text-lg">Send Message</button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
