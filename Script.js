// --- Database of Immersive Library Books ---
const libraryBooks = [
    { title: "The Silk Roads", author: "Peter Frankopan", genre: "history", desc: "A major reassessment of world history through the lens of economic trade routes.", icon: "fa-solid fa-map" },
    { title: "Sapiens", author: "Yuval Noah Harari", desc: "An architectural deep-dive into the evolutionary milestones of humankind.", genre: "history", icon: "fa-solid fa-timeline" },
    { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", desc: "A revolutionary map detailing the conscious dual-systems driving human choice.", genre: "psychology", icon: "fa-solid fa-gears" },
    { title: "Man's Search for Meaning", author: "Viktor Frankl", desc: "An inspiring psychological treatise navigating hope through extreme suffering.", genre: "psychology", icon: "fa-solid fa-compass" },
    { title: "The Divine Comedy", author: "Dante Alighieri", desc: "An epic journey moving fluidly through the classic poetic conceptualizations of the afterlife.", genre: "literature", icon: "fa-solid fa-scroll" },
    { title: "Ficciones", author: "Jorge Luis Borges", desc: "A majestic anthology of surreal labyrinths, infinite libraries, and dreams.", genre: "literature", icon: "fa-solid fa-circle-nodes" },
    { title: "Dune", author: "Frank Herbert", desc: "The ultimate science fiction masterpiece exploring interstellar politics, ecology, and mysticism.", genre: "scifi", icon: "fa-solid fa-globe" },
    { title: "Neuromancer", author: "William Gibson", desc: "The foundational cyberpunk epic that mapped the neon-infused virtual grids of cyberspace.", genre: "scifi", icon: "fa-solid fa-terminal" }
];

// --- High Performance Web Interactive Particle System ---
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 65;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.alpha = Math.random() * 0.5 + 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = `rgba(0, 242, 254, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// --- Asynchronous Render Engine for Books ---
const booksGrid = document.getElementById('booksGrid');
const genreButtons = document.querySelectorAll('.genre-card');

function displayBooks(filterGenre = 'all') {
    // Immediate clear for snappy rendering feedback
    booksGrid.innerHTML = ''; 

    // Instant data filtering
    const filtered = filterGenre === 'all' 
        ? libraryBooks 
        : libraryBooks.filter(book => book.genre === filterGenre);

    // Staggered DOM element mapping to ensure ultra-smooth transition visuals
    filtered.forEach((book, index) => {
        const card = document.createElement('div');
        card.classList.add('book-card');
        card.style.animationDelay = `${index * 60}ms`; // CSS micro-staggering

        card.innerHTML = `
            <div class="book-cover">
                <span class="badge">${book.genre}</span>
                <i class="${book.icon}"></i>
            </div>
            <div class="book-info">
                <h4>${book.title}</h4>
                <p>${book.desc}</p>
                <div class="book-footer">
                    <span class="author">By ${book.author}</span>
                    <button class="read-btn" onclick="alert('Entering the realm of: ${book.title}')">Explore</button>
                </div>
            </div>
        `;
        booksGrid.appendChild(card);
    });
}

// --- Interactive Navigation and Filtering Logic ---
genreButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Active visual toggling
        genreButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Trigger dynamic layout display
        const chosenGenre = button.getAttribute('data-genre');
        displayBooks(chosenGenre);
    });
});

// Run default display instantly on page ready
document.addEventListener('DOMContentLoaded', () => displayBooks('all'));
