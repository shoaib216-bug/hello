import React from 'react';
import { Link } from 'react-router-dom';

export default function Wishes() {
    return (
        <div style={styles.page}>
            <h1 style={styles.title}>Happy Birthday!</h1>

            <div style={styles.card}>
                <p style={styles.text}>
                    “Happy 18th Birthday, Sana! 🎉 Today marks not just another year, but a milestone in your beautiful journey of life. I’m so lucky to share this special day with you. May this year bring you even more happiness, laughter, and success. You deserve the world. I appreciate you so much! ✨”
                </p>
            </div>

            <Link
                to="/"
                style={styles.button}
                onMouseOver={(e) => e.currentTarget.style.background = '#ff005c'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
                ← Back Home
            </Link>
        </div>
    );
}

const styles = {
    page: {
        padding: '20px',
        textAlign: 'center',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#020010',
        fontFamily: "'Segoe UI', sans-serif"
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: '20px'
    },
    card: {
        background: 'rgba(255, 255, 255, 0.05)',
        padding: '25px',
        borderRadius: '15px',
        border: '1px solid #444',
        boxShadow: '0 0 20px rgba(255, 0, 92, 0.3)',
        maxWidth: '600px',
        // Uses the animation from src/styles.css
        animation: 'fadeIn 1.2s ease forwards'
    },
    text: {
        fontSize: '1.2rem',
        lineHeight: '1.6',
        margin: 0,
    },
    button: {
        display: 'inline-block',
        marginTop: '25px',
        padding: '12px 30px',
        borderRadius: '30px',
        textDecoration: 'none',
        color: 'white',
        border: '1px solid #ff005c',
        transition: '0.3s',
        background: 'transparent'
    }
};