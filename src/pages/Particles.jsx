import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function Particles() {
    const [status, setStatus] = useState("Loading AI Libraries...");
    const [isReady, setIsReady] = useState(false);
    const containerRef = useRef(null);

    // Ref to store variables so we can access them in cleanup
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const frameIdRef = useRef(null);

    useEffect(() => {
        let interval;

        // 1. SMART LOADER: Wait until window.THREE and window.Holistic exist
        const checkLibraries = () => {
            if (window.THREE && window.Holistic && window.Camera) {
                console.log("Libraries Loaded!");
                setStatus("Ready! Click Start.");
                setIsReady(true);
                initThree(); // Start the 3D scene immediately
                clearInterval(interval);
            } else {
                console.log("Waiting for libraries...");
            }
        };

        interval = setInterval(checkLibraries, 500); // Check every 0.5 seconds

        return () => {
            clearInterval(interval);
            cleanupThree();
        };
    }, []);

    // --- 3D SETUP ---
    function initThree() {
        if (!containerRef.current) return;

        // Cleanup old canvas if exists
        cleanupThree();

        const width = window.innerWidth;
        const height = window.innerHeight;

        // Scene
        const scene = new window.THREE.Scene();
        sceneRef.current = scene;

        // Camera
        const camera = new window.THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
        camera.position.z = 50;

        // Renderer
        const renderer = new window.THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Particles
        const particleCount = 1200;
        const geometry = new window.THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        // Store extra data directly on geometry for animation
        geometry.userData = {
            velocities: [],
            originalPos: [],
            targetPos: new Float32Array(particleCount * 3)
        };

        for (let i = 0; i < particleCount; i++) {
            const x = (Math.random() - 0.5) * 60;
            const y = (Math.random() - 0.5) * 40;
            const z = (Math.random() - 0.5) * 10;

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            geometry.userData.velocities.push({
                x: (Math.random() - 0.5) * 0.1,
                y: (Math.random() - 0.5) * 0.1,
                z: (Math.random() - 0.5) * 0.1
            });

            // Default targets (center)
            geometry.userData.targetPos[i * 3] = 0;
            geometry.userData.targetPos[i * 3 + 1] = 0;
            geometry.userData.targetPos[i * 3 + 2] = 0;
        }

        geometry.setAttribute('position', new window.THREE.BufferAttribute(positions, 3));

        // Material (Heart Shape)
        const material = new window.THREE.PointsMaterial({
            size: 1.5,
            map: createEmojiTexture('❤️'),
            transparent: true,
            opacity: 0.8,
            depthWrite: false,
            blending: window.THREE.AdditiveBlending
        });

        const particles = new window.THREE.Points(geometry, material);
        particles.name = "magicParticles";
        scene.add(particles);

        // Animation Loop
        const animate = () => {
            frameIdRef.current = requestAnimationFrame(animate);

            // Idle Animation
            const positions = particles.geometry.attributes.position.array;
            const targets = particles.geometry.userData.targetPos;
            const vels = particles.geometry.userData.velocities;
            const isTracking = window.isTrackingActive; // We set this global flag

            for (let i = 0; i < particleCount; i++) {
                const ix = i * 3;

                if (isTracking) {
                    // Move towards face landmarks
                    positions[ix] += (targets[ix] - positions[ix]) * 0.1;
                    positions[ix + 1] += (targets[ix + 1] - positions[ix + 1]) * 0.1;
                    positions[ix + 2] += (targets[ix + 2] - positions[ix + 2]) * 0.1;
                } else {
                    // Floating idle
                    positions[ix] += vels[i].x;
                    positions[ix + 1] += vels[i].y;
                    positions[ix + 2] += vels[i].z;
                }
            }

            particles.geometry.attributes.position.needsUpdate = true;
            renderer.render(scene, camera);
        };

        animate();
    }

    function cleanupThree() {
        if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
        if (rendererRef.current && containerRef.current) {
            containerRef.current.innerHTML = '';
        }
    }

    function createEmojiTexture(emoji) {
        const canvas = document.createElement('canvas');
        canvas.width = 64; canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.font = '50px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(emoji, 32, 35);
        return new window.THREE.CanvasTexture(canvas);
    }

    // --- CAMERA & AI LOGIC ---
    const startCamera = async () => {
        setStatus("Starting Camera...");
        const videoElement = document.querySelector('.input_video');

        try {
            const holistic = new window.Holistic({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/holistic/${file}` });

            holistic.setOptions({
                modelComplexity: 1,
                smoothLandmarks: true,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5
            });

            holistic.onResults((results) => {
                if (!sceneRef.current) return;
                const particles = sceneRef.current.getObjectByName("magicParticles");
                if (!particles || !results.faceLandmarks) return;

                window.isTrackingActive = true;
                setStatus("Face Detected! Move your head.");

                // Map Landmarks to 3D Space
                const targets = particles.geometry.userData.targetPos;
                const width = 50; // Spread factor
                const height = 30;

                for (let i = 0; i < 468; i++) {
                    const lm = results.faceLandmarks[i];
                    // Invert X because camera is mirrored
                    targets[i * 3] = (0.5 - lm.x) * width;
                    targets[i * 3 + 1] = (0.5 - lm.y) * height;
                    targets[i * 3 + 2] = -lm.z * 10;
                }
            });

            const camera = new window.Camera(videoElement, {
                onFrame: async () => {
                    await holistic.send({ image: videoElement });
                },
                width: 640,
                height: 480
            });

            await camera.start();
            setStatus("Camera Active!");
            document.getElementById('startBtn').style.display = 'none';

        } catch (error) {
            console.error(error);
            setStatus("Camera Error: " + error.message);
        }
    };

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh', background: 'black', overflow: 'hidden' }}>

            {/* 3D Canvas */}
            <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}></div>

            {/* Hidden Video Feed for AI */}
            <video className="input_video" style={{ display: 'none' }} playsInline></video>

            {/* UI Controls */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, textAlign: 'center' }}>

                <h2 style={{ color: '#0f0', textShadow: '0 0 10px black', marginBottom: '20px' }}>
                    {status}
                </h2>

                {isReady && (
                    <button
                        id="startBtn"
                        onClick={startCamera}
                        className="btn"
                        style={{ fontSize: '1.5rem', padding: '15px 40px', boxShadow: '0 0 20px #ff005c' }}
                    >
                        🖐️ Activate Magic
                    </button>
                )}
            </div>

            <Link to="/" className="btn" style={{ position: 'absolute', top: 20, left: 20, zIndex: 20 }}>
                ← Back Home
            </Link>
        </div>
    );
}