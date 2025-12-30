import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Love() { // <--- Renamed to match App.jsx
    const messages = [
        "Sana 🎉! Caring, kind, and always there to light up any room with your energy 💪. You’re the best friend anyone could ask for!",
        "Happy birthday, bestie! You’re not just my friend, you’re my positivity, my source of joy 💛.",
        "You make hard days easier and good days even brighter ✨."
    ];

    const [index, setIndex] = useState(0);

    // Auto-play timer
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [messages.length]);

    return (
        <div style={styles.page}>
            <h1 style={styles.title}>For You</h1>

            {/* Card with Animation */}
            <div key={index} style={styles.card}>
                {messages[index]}
            </div>

            {/* Controls */}
            <div style={styles.controls}>
                <button
                    style={styles.btnNav}
                    onClick={() => setIndex((index - 1 + messages.length) % messages.length)}
                >
                    ⬅
                </button>
                <button
                    style={styles.btnNav}
                    onClick={() => setIndex((index + 1) % messages.length)}
                >
                    ➡
                </button>
            </div>

            <Link to="/" style={styles.backBtn}>← Back Home</Link>
        </div>
    );
}

const styles = {
    page: {
        padding: '30px',
        textAlign: 'center',
        color: 'white',
        minHeight: '100vh',
        // Uses your global background or a specific one
        background: '#121212',
    },
    title: {
        marginBottom: '25px',
    },
    card: {
        background: '#1e1e1e',
        padding: '22px',
        borderRadius: '12px',
        maxWidth: '600px',
        margin: '0 auto',
        fontSize: '1.1rem',
        lineHeight: '1.6',
        // Using the animation defined in styles.css
        animation: 'fadeIn 0.8s ease',
    },
    controls: {
        marginTop: '15px',
    },
    btnNav: {
        margin: '0 10px',
        padding: '6px 14px',
        fontSize: '1rem',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        background: '#333',
        color: '#fff',
    },
    backBtn: {
        display: 'inline-block',
        marginTop: '30px',
        padding: '10px 22px',
        background: '#ff6f61',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '6px',
    },
};