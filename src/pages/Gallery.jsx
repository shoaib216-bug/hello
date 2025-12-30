import React from 'react';
import { Link } from 'react-router-dom';

export default function Gallery() {
    const images = [
        'couple1.jpg', 'couple2.jpg', 'couple3.jpg', 'couple4.jpg',
        'couple5.jpg', 'couple7.jpg', 'couple9.jpg',
        'couple10.jpg', 'couple12.jpg', 'couple13.jpg',
        'couple14.jpg', 'couple15.jpg', 'couple16.jpg', 'couple17.jpg',
        'couple18.jpg', 'couple19.jpg', 'our-photo.jpg','couple20.jpg', 'couple21.jpg', 'couple22.jpg', 'couple24.jpg',
        'couple25.jpg', 'couple26.jpg', 'couple28.jpg', 'couple29.jpg',
        'couple30.jpg', 'couple31.jpg', 'couple32.jpg', 'couple33.jpg',
        'couple34.jpg', 'couple35.jpg', 'couple36.jpg', 'couple37.jpg',
        'couple38.jpg', 'couple39.jpg',  'couple40.jpg', 'couple23.jpg'
    ];

    return (
        <div className="home-page gallery-page">

            <h1 className="hero-title">📸 Our Memories</h1>
            <p style={{ color: '#ccc', marginBottom: '30px' }}>
                Captured moments of happiness.
            </p>

            {/* Fancy Border Container */}
            <div className="premium-border">
                <div className="premium-grid">
                    {images.map((img, index) => (
                        <div key={index} className="photo-card">
                            <img
                                src={`/${img}`}
                                alt={`Memory ${index}`}
                                loading="lazy"
                                onError={(e) => e.target.style.display = 'none'}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <br /><br />
            <Link to="/" className="btn">← Back Home</Link>
        </div>
    );
}