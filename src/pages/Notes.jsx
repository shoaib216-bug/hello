// src/pages/Notes.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Notes() { // <--- Renamed to match App.jsx
    return (
        <div style={styles.page}>
            <h1 style={styles.title}>Our Future</h1>

            {/* Using animation from styles.css */}
            <div style={styles.card}>
                <p style={styles.text}>
                    “From 22nd February, 2024, to February 18, 2032, there are 2,559 days, 24,000 hours, and 1,440,000 minutes
                    left for us to create more beautiful memories. Together, we’ll conquer every challenge. Inshallah,
                    you’ll forever be mine 🫶💞.”
                </p>
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
        // Uses the @keyframes fadeIn defined in your styles.css
        animation: 'fadeIn 0.8s ease',
    },
    text: {
        margin: 0,
        color: '#e0e0e0',
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