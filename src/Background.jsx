import React, { useEffect, useState } from 'react';

// This component runs on every page
const Background = () => {
    const [items, setItems] = useState([]);
    const decorations = ['🎈', '🎗️', '🎀', '🎊', '✨', '🟣', '🟠', '🎂'];

    useEffect(() => {
        // Create 25 floating items with random positions
        const newItems = Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            icon: decorations[Math.floor(Math.random() * decorations.length)],
            left: Math.random() * 100 + '%',      // Random horizontal spot
            duration: Math.random() * 10 + 10 + 's', // Slow floating (10-20s)
            delay: Math.random() * 10 + 's',      // Random start time
            size: Math.random() * 1.5 + 1 + 'rem' // Random size
        }));
        setItems(newItems);
    }, []);

    return (
        <div className="global-floating-container">
            {items.map((item) => (
                <div
                    key={item.id}
                    className="global-floating-item"
                    style={{
                        left: item.left,
                        animationDuration: item.duration,
                        animationDelay: item.delay,
                        fontSize: item.size
                    }}
                >
                    {item.icon}
                </div>
            ))}
        </div>
    );
};

export default Background;