import React from 'react';

export default function StarBackground() {
    const stars = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        size: Math.random() > 0.5 ? 'w-1 h-1' : 'w-0.5 h-0.5'
    }));

    return (
        <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className={`absolute ${star.size} bg-white rounded-full animate-pulse`}
                    style={{
                        left: star.left,
                        top: star.top,
                        animationDelay: star.animationDelay,
                        animationDuration: '2s'
                    }}
                />
            ))}

            <div className="relative z-10 flex items-center justify-center h-full">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Starry Night
                    </h1>
                    <p className="text-gray-300 text-lg">
                        A simple star background with Tailwind CSS
                    </p>
                </div>
            </div>
        </div>
    );
}