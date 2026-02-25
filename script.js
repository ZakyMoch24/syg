// =====================
// Floating Hearts (Muncul sedikit lalu hilang)
// =====================
let heartShown = 0;
const maxHearts = 3;
function createHeart() {
    if (heartShown >= maxHearts) return;
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerText = "💗";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 2 + Math.random() * 2 + "s";
    document.body.appendChild(heart);
    heartShown++;
    setTimeout(() => {
        heart.remove();
    }, 3500);
}
for (let i = 0; i < maxHearts; i++) {
    setTimeout(createHeart, i * 900);
}
// Hapus semua heart setelah 5 detik
setTimeout(() => {
    document.querySelectorAll('.heart').forEach(h => h.remove());
}, 5000);


// =====================
// Typewriter Effect
// =====================
const typewriter = document.querySelector(".typewriter");
if (typewriter) {
    const text = typewriter.textContent;
    typewriter.textContent = "";
    let i = 0;

    function type() {
        if (i < text.length) {
            typewriter.textContent += text.charAt(i);
            i++;
            setTimeout(type, 70);
        }
    }
    type();
}


// =====================
// Confetti (Canvas, hanya sedikit & sebentar)
// =====================
const canvas = document.getElementById("confetti");
if (canvas) {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const confettiCount = 18; // lebih banyak agar meriah
    let running = true;
    const confettiColors = [
        '#ff69b4', '#ff99cc', '#ffb6d9', '#ffe066', '#b5ead7', '#b2cefe', '#f7b2ad', '#f6e6ff'
    ];
    const confettiShapes = ['rect', 'circle', 'triangle', 'strip'];

    function createPiece() {
        const shape = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: 10 + Math.random() * 14,
            speed: 1 + Math.random() * 2,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            shape,
            angle: Math.random() * 360,
            rotateSpeed: (Math.random() - 0.5) * 4
        };
    }

    for (let i = 0; i < confettiCount; i++) pieces.push(createPiece());

    function drawPiece(p) {
        ctx.save();
        ctx.translate(p.x + p.size/2, p.y + p.size/2);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.fillStyle = p.color;
        switch (p.shape) {
            case 'rect':
                ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size * 0.6);
                break;
            case 'circle':
                ctx.beginPath();
                ctx.arc(0, 0, p.size/2, 0, 2 * Math.PI);
                ctx.fill();
                break;
            case 'triangle':
                ctx.beginPath();
                ctx.moveTo(0, -p.size/2);
                ctx.lineTo(-p.size/2, p.size/2);
                ctx.lineTo(p.size/2, p.size/2);
                ctx.closePath();
                ctx.fill();
                break;
            case 'strip':
                ctx.fillRect(-p.size/4, -p.size/2, p.size/2, p.size);
                break;
        }
        ctx.restore();
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!running) return;
        pieces.forEach(p => {
            p.y += p.speed;
            p.angle += p.rotateSpeed;
            if (p.y > canvas.height) {
                p.y = -10;
                p.x = Math.random() * canvas.width;
            }
            drawPiece(p);
        });
        requestAnimationFrame(update);
    }

    update();
    // Hentikan confetti & hapus setelah 5 detik
    setTimeout(() => {
        running = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 5000);
}
