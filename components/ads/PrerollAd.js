import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PrerollAd({ onComplete, duration = 5 }) {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [canSkip, setCanSkip] = useState(false);

    useEffect(() => {
        if (timeLeft <= 0) {
            onComplete?.();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setCanSkip(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onComplete]);

    useEffect(() => {
        // Allow skip after 3 seconds
        const skipTimer = setTimeout(() => {
            setCanSkip(true);
        }, 3000);

        return () => clearTimeout(skipTimer);
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-dark-900 flex items-center justify-center"
            >
                <div className="text-center max-w-lg px-4">
                    {/* Ad placeholder */}
                    <div className="ad-container ad-container-large mb-6 rounded-xl">
                        <span>Video Ad Placeholder</span>
                    </div>

                    {/* Timer / Skip button */}
                    <div className="flex items-center justify-center gap-4">
                        {canSkip ? (
                            <button
                                onClick={onComplete}
                                className="btn-primary"
                            >
                                Skip Ad →
                            </button>
                        ) : (
                            <div className="text-dark-400">
                                Ad will close in {timeLeft}s
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}