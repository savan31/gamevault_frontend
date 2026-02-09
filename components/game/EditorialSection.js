import { EDITORIAL_CONTENT } from '@/lib/editorial';

export default function EditorialSection({ slug, title }) {
    const content = EDITORIAL_CONTENT[slug];

    if (!content) {
        return (
            <div className="mt-12 p-8 bg-dark-900/50 border border-dark-800 rounded-3xl">
                <p className="text-dark-400 italic text-center">
                    Our editorial team is currently preparing a deep-dive review and strategy guide for {title}. Check back soon for expert insights!
                </p>
            </div>
        );
    }

    return (
        <div className="mt-12 space-y-12">
            {/* Ad Placeholder Top - 150px buffer requirement */}
            <div className="py-[150px] flex items-center justify-center border-y border-dark-800/50 bg-dark-900/10">
                <div className="text-dark-600 text-xs tracking-widest uppercase border border-dark-700 px-4 py-2 rounded">
                    Advertisement Slot #1 (150px Buffer Active)
                </div>
            </div>

            <section className="prose prose-invert max-w-none">
                <div className="bg-dark-900 border border-dark-800 rounded-3xl p-8 md:p-12 shadow-xl">
                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                        <span className="w-2 h-8 bg-primary-500 rounded-full"></span>
                        How to Play {title}: The Ultimate Guide
                    </h2>
                    <div className="text-dark-300 text-lg leading-relaxed whitespace-pre-wrap mb-10">
                        {content.howToPlay}
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                        <span className="w-2 h-8 bg-secondary-500 rounded-full"></span>
                        Mechanical Review & Analysis
                    </h2>
                    <div className="text-dark-300 text-lg leading-relaxed whitespace-pre-wrap mb-10">
                        {content.review}
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                        <span className="w-2 h-8 bg-green-500 rounded-full"></span>
                        Advanced Strategies & Pro Tips
                    </h2>
                    <div className="text-dark-300 text-lg leading-relaxed whitespace-pre-wrap">
                        {content.strategy}
                    </div>
                </div>
            </section>

            {/* Ad Placeholder Bottom - 150px buffer requirement */}
            <div className="py-[150px] flex items-center justify-center border-y border-dark-800/50 bg-dark-900/10">
                <div className="text-dark-600 text-xs tracking-widest uppercase border border-dark-700 px-4 py-2 rounded">
                    Advertisement Slot #2 (150px Buffer Active)
                </div>
            </div>
        </div>
    );
}
