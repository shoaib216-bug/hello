import React from 'react';
import { Link } from 'react-router-dom';
// The styles.css is already imported in main.jsx/App.jsx, so classes work automatically

export default function Timeline() {
    return (
        <div className="section">
            {/* Optional: Add a subtle background or container */}
            <div className="container">
                <h1 className="section-title">📅 Our Friendship Story</h1>
                <p style={{ color: '#aaa', marginBottom: '30px' }}>
                    How it all started...
                </p>

                <div className="timeline-list">

                    {/* Event 1 */}
                    <div className="card" style={{ marginBottom: '20px', textAlign: 'left' }}>
                        <h3 style={{ color: '#ff6f61' }}>15th February</h3>
                        <p>
                            The day we first met — laughter, awkward hellos,
                            and an instant connection 🤗.
                        </p>
                    </div>

                    {/* Event 2 */}
                    <div className="card" style={{ marginBottom: '20px', textAlign: 'left' }}>
                        <h3 style={{ color: '#ff6f61' }}>First Hangout</h3>
                        <p>
                            Snacks, silly stories, and the start of a great friendship.
                        </p>
                    </div>

                    {/* Event 3 */}
                    <div className="card" style={{ marginBottom: '20px', textAlign: 'left' }}>
                        <h3 style={{ color: '#ff6f61' }}></h3>
                        <p>
                            You’re my lifelong friend and partner-"in-crime" —
                            always  💛.
                        </p>
                    </div>

                </div>

                <br />
                <Link to="/" className="btn secondary">← Back Home</Link>
            </div>
        </div>
    );
}