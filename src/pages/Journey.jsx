import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Journey() {
    const [sliderPosition, setSliderPosition] = useState(50);

    const handleSliderChange = (e) => {
        setSliderPosition(e.target.value);
    };

    return (
        <div className="home-page">
            <h1 className="hero-title">⏳ Time Flies</h1>
            <p style={{ color: '#ccc', marginBottom: '30px' }}>
                Drag the slider to see the magic ✨
            </p>

            {/* COMPARISON CONTAINER */}
            <div className="comparison-wrapper">
                <div className="comparison-container">

                    {/* 1. The Adult Photo (Background) */}
                    <img
                        src="/adult.jpg"
                        alt="Adult"
                        className="comp-img"
                    />

                    {/* 2. The Child Photo (Foreground - Clipped) */}
                    <img
                        src="/child.jpg"
                        alt="Child"
                        className="comp-img overlay-img"
                        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                    />

                    {/* 3. The Slider Handle */}
                    <div
                        className="slider-line"
                        style={{ left: `${sliderPosition}%` }}
                    >
                        <div className="slider-button">◄ ►</div>
                    </div>

                    {/* 4. The Invisible Input Range */}
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderPosition}
                        onChange={handleSliderChange}
                        className="slider-input"
                    />
                </div>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <h3 style={{ color: '#ffd700' }}>From Cute to Queen 👑</h3>
                <p>18 Years of awesomeness.</p>
            </div>

            <br />
            <Link to="/" className="btn">← Back Home</Link>
        </div>
    );
}