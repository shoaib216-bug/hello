const audio = document.getElementById('bg-music');
const playBtn = document.getElementById('playPauseBtn');
const canvas = document.getElementById('hearts-canvas');
const ctx = canvas ? canvas.getContext('2d') : null;

// --- THE FIX: This function handles the closing ---
function closePopup() {
    const popup = document.getElementById('celebration');
    if (popup) {
        popup.style.display = 'none';
        // Try to play music when they enter
        if (audio && audio.paused) audio.play().catch(e => console.log('Audio requires interaction'));
    }
}

if (playBtn && audio) {
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().then(() => { playBtn.textContent = 'Pause Music ⏸'; }).catch(e => alert('Please interact with the document first or check file path.'));
        } else {
            audio.pause();
            playBtn.textContent = 'Play Music 🎵';
        }
    });
}

function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let birthday = new Date(currentYear, 11, 31, 0, 0, 0);
    if (now > birthday) birthday = new Date(currentYear + 1, 11, 31, 0, 0, 0);

    const diff = birthday - now;
    const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    const h = Math.floor((diff / 1000 / 60 / 60) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    if (document.getElementById('cd-days')) {
        document.getElementById('cd-days').innerText = d;
        document.getElementById('cd-hours').innerText = h < 10 ? '0' + h : h;
        document.getElementById('cd-mins').innerText = m < 10 ? '0' + m : m;
        document.getElementById('cd-secs').innerText = s < 10 ? '0' + s : s;
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();

if (canvas) {
    let hearts = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    function createHeart() {
        return {
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 20,
            size: Math.random() * 15 + 5,
            speed: Math.random() * 2 + 1,
            color: 'rgba(255, 193, 7, ' + Math.random() + ')'
        };
    }
    function drawHearts() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (hearts.length < 50) hearts.push(createHeart());
        hearts.forEach((h, index) => {
            h.y -= h.speed;
            ctx.fillStyle = h.color;
            ctx.font = h.size + 'px serif';
            ctx.fillText('✨', h.x, h.y);
            if (h.y < -20) hearts.splice(index, 1);
        });
        requestAnimationFrame(drawHearts);
    }
    drawHearts();
}
