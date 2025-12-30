// src/pages/Health.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Health() {
    return (
        <div style={styles.page}>
            <h1 style={styles.title}>Always With You</h1>

            <div style={styles.card}>
                <p style={styles.text}>
                    “Don’t worry, my friend. No matter what, I’ll always be by your side
                    through thick and thin. Health problems? We’ll face them together,
                    and your happiness will always come first. Stay strong, and always
                    smile—because I care about you more than words can say.”
                </p>

                <div style={styles.emoji}>🛡️ 🤝 🛡️</div>
            </div>

            <Link to="/" style={styles.button}>← Back Home</Link>
        </div>
    );
}

const styles = {
    page: {
        padding: '30px',
        textAlign: 'center',
        color: 'white',
        minHeight: '100vh',
    },
    title: {
        marginBottom: '25px',
        fontSize: '2rem',
    },
    card: {
        background: '#1e1e1e',
        padding: '25px',
        borderRadius: '12px',
        maxWidth: '600px',
        margin: '0 auto',
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
    },
    text: {
        fontSize: '1.1rem',
        lineHeight: '1.6',
        color: '#e0e0e0',
    },
    emoji: {
        fontSize: '2rem',
        marginTop: '15px',
    },
    button: {
        display: 'inline-block',
        marginTop: '30px',
        padding: '10px 22px',
        background: '#6c63ff',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '6px',
        fontWeight: 'bold',
    },
};