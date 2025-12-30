import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

// ⚠️ CHANGE THIS DATE!
// For Demo (5 seconds from now):
const TARGET_DATE = new Date(Date.now() + 5000);

// For Real Birthday (Uncomment below and comment above):
// const TARGET_DATE = new Date("2025-12-31T00:00:00"); 

const Home = () => {
    const audioRef = useRef(null);
    const videoRef = useRef(null);

    const [musicPlaying, setMusicPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [celebrationPhase, setCelebrationPhase] = useState("countdown"); // Phases: 'countdown', 'video', 'party'

    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, mins: 0, secs: 5
    });

    // 1. CLICK TO START (Unlocks Audio/Video permissions)
    const handleUserInteraction = () => {
        setHasInteracted(true);
        // Unlock Audio
        if (audioRef.current) {
            audioRef.current.play().then(() => {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }).catch(e => console.log("Audio unlock failed", e));
        }
        // Unlock Video
        if (videoRef.current) {
            videoRef.current.load();
        }
    };

    // 2. COUNTDOWN TIMER
    useEffect(() => {
        if (!hasInteracted) return;

        const timer = setInterval(() => {
            const now = new Date();
            const diff = TARGET_DATE - now;

            if (diff <= 0) {
                // TIME IS UP! 
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });

                // If we haven't shown video yet, start it
                if (celebrationPhase === "countdown") {
                    startCelebration();
                }
                return;
            }

            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                mins: Math.floor((diff / (1000 * 60)) % 60),
                secs: Math.floor((diff / 1000) % 60),
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [hasInteracted, celebrationPhase]);

    // 3. START VIDEO PHASE
    const startCelebration = () => {
        setCelebrationPhase("video");
        setShowVideo(true);

        setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.play().catch(e => console.log("Video play error", e));
            }
        }, 100);
    };

    // 4. VIDEO ENDED -> START MUSIC & WEBSITE
    const handleVideoEnd = () => {
        setShowVideo(false);
        setCelebrationPhase("party");

        // Start Background Music
        if (audioRef.current) {
            audioRef.current.play();
            setMusicPlaying(true);
        }

        startConfetti();
        startImageRain();
    };

    const toggleMusic = () => {
        if (!audioRef.current) return;
        if (musicPlaying) audioRef.current.pause();
        else audioRef.current.play();
        setMusicPlaying(!musicPlaying);
    };

    // --- VISUAL EFFECTS ---
    const startConfetti = () => {
        let count = 0;
        const interval = setInterval(() => {
            if (count > 300) return clearInterval(interval);
            const div = document.createElement("div");
            div.className = "confetti";
            div.style.left = Math.random() * 100 + "vw";
            div.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            document.body.appendChild(div);
            setTimeout(() => div.remove(), 5000);
            count++;
        }, 50);
    };

    const startImageRain = () => {
        let count = 0;
        const images = ["/couple1.jpg", "/couple3.jpg", "/couple5.jpg"];
        const interval = setInterval(() => {
            if (count > 50) return clearInterval(interval);
            const img = document.createElement("img");
            img.src = images[Math.floor(Math.random() * images.length)];
            img.className = "falling-photo";
            img.style.left = Math.random() * 90 + "%";
            document.body.appendChild(img);
            setTimeout(() => img.remove(), 8000);
            count++;
        }, 300);
    };

    return (
        <div className="home-page">
            <audio ref={audioRef} src="/music.mp3" loop />

            {/* OVERLAY: Forces user to click so media can play automatically */}
            {!hasInteracted && (
                <div style={overlayStyle}>
                    <h1>Are you ready? 🎁</h1>
                    <button onClick={handleUserInteraction} className="btn" style={{ fontSize: '1.5rem', marginTop: '20px' }}>
                        Yes, Enter!
                    </button>
                </div>
            )}

            {/* VIDEO PLAYER (Only shows at 00:00) */}
            {showVideo && (
                <div className="video-overlay">
                    <video
                        ref={videoRef}
                        src="/video.mp4"
                        onEnded={handleVideoEnd}
                        controls={false}
                        playsInline
                    />
                    <button className="skip-btn" onClick={handleVideoEnd}>
                        Skip Video →
                    </button>
                </div>
            )}

            {/* MAIN CONTENT */}
            <main className="section" style={{ opacity: hasInteracted ? 1 : 0.1 }}>

                <h1 className="hero-title">Sana Firdous 👑</h1>
                <p className="hero-subtitle">My favorite human ✨</p>

                {/* LOGIC: Show Big Countdown OR Happy Birthday Message */}
                {celebrationPhase === "countdown" ? (
                    <div className="big-countdown">
                        <div><span>{timeLeft.days}</span><small>Days</small></div>
                        <div><span>{timeLeft.hours}</span><small>Hrs</small></div>
                        <div><span>{timeLeft.mins}</span><small>Mins</small></div>
                        <div><span>{timeLeft.secs}</span><small>Secs</small></div>
                    </div>
                ) : (
                    <div style={{ margin: '20px 0', animation: 'fadeIn 1s' }}>
                        <h2 style={{ color: '#ffd700', fontSize: '2rem' }}>🎉 HAPPY BIRTHDAY! 🎉</h2>
                        <p>Enjoy your special day!</p>
                    </div>
                )}

                <img
                    src="/couple3.jpg"
                    alt="Us"
                    style={{ maxWidth: "100%", borderRadius: "12px", marginTop: '10px' }}
                />

                <br />

                <button className="btn" onClick={toggleMusic}>
                    {musicPlaying ? "Pause Music ⏸️" : "Play Our Song 🎵"}
                </button>

                {/* MENU GRID */}
                <div className="landing-grid">
                    <Link to="/particles" className="card">🖐️ Gesture Magic</Link>
                    <Link to="/love" className="card">💬 Notes</Link>
                    <Link to="/gallery" className="card">📸 Gallery</Link>
                    <Link to="/timeline" className="card">📅 Story</Link>
                    <Link to="/wishes" className="card">🎂 Wishes</Link>
                    <Link to="/poem" className="card">📜 Poem</Link>
                    <Link to="/health" className="card">❤️ Health</Link>
                    <Link to="/journey" className="card">👶➡️👩 Journey</Link>
                </div>
            </main>
        </div>
    );
};

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.95)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10000,
    color: 'white'
};

export default Home;