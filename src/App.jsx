import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles.css';

// Import Global Background
import Background from './Background';

// Import Pages
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Health from './pages/Health';
import Love from './pages/Love';
import Notes from './pages/Notes';
import Poem from './pages/Poem';
import Timeline from './pages/Timeline';
import Wishes from './pages/Wishes';
import Particles from './pages/Particles';
import Journey from './pages/Journey';

function App() {
    return (
        <Router>
            {/* 🎈 This puts decorations on EVERY page */}
            <Background />

            <div className="app-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/health" element={<Health />} />
                    <Route path="/love" element={<Love />} />
                    <Route path="/notes" element={<Notes />} />
                    <Route path="/poem" element={<Poem />} />
                    <Route path="/timeline" element={<Timeline />} />
                    <Route path="/wishes" element={<Wishes />} />
                    <Route path="/particles" element={<Particles />} />
                    <Route path="/journey" element={<Journey />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;