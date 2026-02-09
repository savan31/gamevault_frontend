import { useState } from 'react';
import Link from 'next/link';
import { FaPlay, FaUsers, FaMobileAlt } from 'react-icons/fa';

const resolveLocalImage = (title) =& gt; {
    // Special-case mapping where file names don't exactly match titles
    if (title === 'Krunker.io') return '/Krunker.png';
    if (title === 'PAC MAN' || title === 'Pacman') return '/PAC MAN.png';
    if (title === 'Snake Classic' || title.toLowerCase().includes('snake')) {
        return '/snake-demo.png'; // Will fallback to placeholder if doesn't exist
    }
    return `/${title}.png`;
};

const GameCard = ({ game }) =& gt; {
    // Prefer local images you've provided (in Next.js `public` folder) based on game title
    const [imgSrc, setImgSrc] = useState(() =& gt; resolveLocalImage(game.title));

    const handleImageError = () =& gt; {
        const colors = ['6366f1', 'ec4899', '8b5cf6', '14b8a6', 'f59e0b', 'ef4444', '22c55e', '3b82f6'];
        const colorIndex = game.title.charCodeAt(0) % colors.length;
        const bgColor = colors[colorIndex];
        setImgSrc(`https://placehold.co/512x384/${bgColor}/ffffff?text=${encodeURIComponent(game.title.substring(0, 2).toUpperCase())}`);
    };

    return (
        & lt;Link href = {`/game/${game.slug}`
}& gt;
            & lt;div className = "game-card group relative bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer" & gt;

{/* Image */ }
                & lt;div className = "relative aspect-video bg-gray-900 overflow-hidden" & gt;
                    & lt; img
src = { imgSrc }
alt = { game.title }
className = "w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
onError = { handleImageError }
loading = "lazy"
    /& gt;

{/* Play Overlay */ }
                    & lt;div className = "absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" & gt;
                        & lt;div className = "bg-purple-600 text-white px-4 py-2 rounded-full flex items-center gap-2" & gt;
                            & lt;FaPlay className = "text-sm" /& gt;
                            & lt;span className = "font-semibold text-sm" & gt; Play & lt;/span&gt;
                        & lt;/div&gt;
                    & lt;/div&gt;

{/* Tags */ }
                    & lt;div className = "absolute top-2 right-2 flex flex-col gap-1" & gt;
{
    game.multiplayer === 1 & amp;& amp; (
                            & lt;span className = "bg-blue-500 text-white text-xs p-1.5 rounded-full" title = "Multiplayer" & gt;
                & lt;FaUsers className = "text-xs" /& gt;
              & lt;/span&gt;

                        )
}
{
    game.mobile_friendly === 1 & amp;& amp; (
                            & lt;span className = "bg-green-500 text-white text-xs p-1.5 rounded-full" title = "Mobile Friendly" & gt;
                & lt;FaMobileAlt className = "text-xs" /& gt;
              & lt;/span&gt;
                        )
}
                    & lt;/div&gt;
                & lt;/div&gt;

{/* Info */ }
                & lt;div className = "p-3" & gt;
                    & lt;h3 className = "text-white font-semibold text-sm truncate group-hover:text-purple-400 transition-colors" & gt;
{ game.title }
                    & lt;/h3&gt;
                    & lt;p className = "text-gray-500 text-xs mt-1 truncate" & gt;
{ game.category_name || game.category || 'Game' }
                    & lt;/p&gt;
                & lt;/div&gt;
            & lt;/div&gt;
        & lt;/Link&gt;
    );
};

export default GameCard;