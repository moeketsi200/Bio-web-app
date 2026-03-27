const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

// Set canvas to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 60; // Adjust this to change the density of the shapes
const connectionDistance = 180; // How long the connecting lines can be
let cubesArray = [];
const numberOfCubes = 15; // Number of cubes on screen
let starsArray = [];
const numberOfStars = 200; // Number of stars in the background
let moonsArray = []; // Array to hold multiple moons
const numberOfMoons = 4; // Number of different moons

// Geometric Core properties
const core = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    speedX: 0.8, // Horizontal drift speed
    speedY: 0.6, // Vertical drift speed
    baseSize: 25,
    size: 25,
    sides: 6, // A hexagon
    rotation: 0,
    pulse: 0
};

// Handle window resizing
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    core.x = canvas.width / 2;
    core.y = canvas.height / 2;
    init();
});

class Moon {
    constructor() {
        this.size = Math.random() * 15 + 10; // Smaller radius: between 10 and 25
        // Start at a random position, fully inside the canvas
        this.x = Math.random() * (canvas.width - this.size * 2) + this.size;
        this.y = Math.random() * (canvas.height - this.size * 2) + this.size;
        // Varying slow drifting speeds
        this.speedX = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.2 + 0.05);
        this.speedY = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 0.2 + 0.05);
        
        // Use the site's main highlight color
        this.color = '#00ffd5';
        
        // Randomly choose a moon phase and a tilt angle
        const phases = ['full', 'half', 'crescent', 'gibbous'];
        this.phase = phases[Math.floor(Math.random() * phases.length)];
        this.rotationAngle = Math.random() * Math.PI * 2; // Random rotation
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Gently bounce off the edges of the screen
        if (this.x < this.size || this.x > canvas.width - this.size) this.speedX *= -1;
        if (this.y < this.size || this.y > canvas.height - this.size) this.speedY *= -1;
    }

    draw() {
        ctx.save();
        
        // Translate context to the moon's position so we can rotate the phase shape
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotationAngle);
        
        // Create a radial gradient (now relative to 0,0 since we translated)
        const gradient = ctx.createRadialGradient(
            -this.size / 3, -this.size / 3, this.size / 10, 
            0, 0, this.size
        );
        
        // Parse hex color to RGB for the fade-out edge
        let r = parseInt(this.color.slice(1, 3), 16);
        let g = parseInt(this.color.slice(3, 5), 16);
        let b = parseInt(this.color.slice(5, 7), 16);
        
        gradient.addColorStop(0, '#ffffff'); // Bright white center
        gradient.addColorStop(0.6, this.color); // Neon mid-tone
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`); // Fade out edge

        ctx.beginPath();
        
        // Draw the specific moon phase shape
        if (this.phase === 'full') {
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        } else if (this.phase === 'half') {
            ctx.arc(0, 0, this.size, -Math.PI / 2, Math.PI / 2);
            ctx.lineTo(0, -this.size); // Straight line back to top
        } else if (this.phase === 'crescent') {
            ctx.arc(0, 0, this.size, -Math.PI / 2, Math.PI / 2);
            ctx.quadraticCurveTo(this.size * 0.5, 0, 0, -this.size); // Inward curve
        } else if (this.phase === 'gibbous') {
            ctx.arc(0, 0, this.size, -Math.PI / 2, Math.PI / 2);
            ctx.quadraticCurveTo(-this.size * 0.5, 0, 0, -this.size); // Outward curve
        }
        
        ctx.fillStyle = gradient;
        
        // Add an external neon glow
        ctx.shadowBlur = 20; // Slightly reduced glow for smaller moons
        ctx.shadowColor = this.color;
        
        ctx.fill();
        ctx.restore();
    }
}

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5;
        this.opacity = Math.random() * 0.5 + 0.2; // Start with a base visibility
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    update() {
        // Add a subtle twinkle effect
        if (Math.random() > 0.99) {
            this.opacity = Math.random() * 0.5 + 0.3;
        }
    }
}
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1; // Size of the dots
        this.speedX = Math.random() * 1 - 0.5; // Drift speed
        this.speedY = Math.random() * 1 - 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off the edges of the screen
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    
    draw() {
        // Use the site's highlight color: #00ffd5
        ctx.fillStyle = 'rgba(0, 255, 213, 0.8)'; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class WireframeCube {
    constructor() {
        // Start at a random position on screen
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        
        // Varying sizes
        this.size = Math.random() * 20 + 10; 
        
        // Random speed and direction
        this.speedX = (Math.random() - 0.5) * 0.8; 
        this.speedY = (Math.random() - 0.5) * 0.8; 
        
        // Initial random rotation angles
        this.angleX = Math.random() * Math.PI * 2;
        this.angleY = Math.random() * Math.PI * 2;
        this.angleZ = Math.random() * Math.PI * 2;
        
        // Speed of rotation for each axis
        this.rotSpeedX = (Math.random() - 0.5) * 0.01;
        this.rotSpeedY = (Math.random() - 0.5) * 0.01;
        this.rotSpeedZ = (Math.random() - 0.5) * 0.01;
    }
    
    update() {
        // Move the cube
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around the screen edges
        if (this.x > canvas.width + this.size) this.x = -this.size;
        else if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
        else if (this.y < -this.size) this.y = canvas.height + this.size;

        // Apply rotation
        this.angleX += this.rotSpeedX;
        this.angleY += this.rotSpeedY;
        this.angleZ += this.rotSpeedZ;
    }

    draw() {
        // The 8 vertices of a standard cube
        const nodes = [
            [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
        ];
        
        // The 12 lines connecting the vertices
        const edges = [
            [0, 1], [1, 2], [2, 3], [3, 0], // Back face
            [4, 5], [5, 6], [6, 7], [7, 4], // Front face
            [0, 4], [1, 5], [2, 6], [3, 7]  // Connecting lines
        ];

        let projectedNodes = [];

        // Rotate and project each point
        for (let i = 0; i < nodes.length; i++) {
            let [x, y, z] = nodes[i];

            // Rotate around X-axis
            let y1 = y * Math.cos(this.angleX) - z * Math.sin(this.angleX);
            let z1 = y * Math.sin(this.angleX) + z * Math.cos(this.angleX);
            y = y1; z = z1;

            // Rotate around Y-axis
            let x2 = x * Math.cos(this.angleY) + z * Math.sin(this.angleY);
            let z2 = -x * Math.sin(this.angleY) + z * Math.cos(this.angleY);
            x = x2; z = z2;

            // Rotate around Z-axis
            let x3 = x * Math.cos(this.angleZ) - y * Math.sin(this.angleZ);
            let y3 = x * Math.sin(this.angleZ) + y * Math.cos(this.angleZ);
            x = x3; y = y3;

            // Scale to size and move to position
            projectedNodes.push([
                x * this.size + this.x, 
                y * this.size + this.y
            ]);
        }

        // Draw the wireframe
        ctx.strokeStyle = 'rgba(0, 255, 213, 0.4)'; // Use site's highlight color
        ctx.lineWidth = 1;
        ctx.beginPath();
        
        for (let i = 0; i < edges.length; i++) {
            let p1 = projectedNodes[edges[i][0]];
            let p2 = projectedNodes[edges[i][1]];
            ctx.moveTo(p1[0], p1[1]);
            ctx.lineTo(p2[0], p2[1]);
        }
        ctx.stroke();
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
    
    cubesArray = [];
    for (let i = 0; i < numberOfCubes; i++) {
        cubesArray.push(new WireframeCube());
    }

    starsArray = [];
    for (let i = 0; i < numberOfStars; i++) {
        starsArray.push(new Star());
    }
    
    moonsArray = [];
    for (let i = 0; i < numberOfMoons; i++) {
        moonsArray.push(new Moon());
    }
}

function drawCore() {
    // Move the core around the screen
    core.x += core.speedX;
    core.y += core.speedY;

    // Bounce the core off the edges of the screen
    if (core.x < 30 || core.x > canvas.width - 30) core.speedX *= -1;
    if (core.y < 30 || core.y > canvas.height - 30) core.speedY *= -1;

    // Update core animation
    core.rotation += 0.005;
    core.pulse += 0.02;
    // Pulsating size effect
    core.size = core.baseSize + Math.sin(core.pulse) * 5;

    ctx.strokeStyle = 'rgba(0, 255, 213, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();

    // Calculate vertices and draw the polygon
    for (let i = 0; i < core.sides; i++) {
        const angle = core.rotation + (i * 2 * Math.PI) / core.sides;
        const x = core.x + Math.cos(angle) * core.size;
        const y = core.y + Math.sin(angle) * core.size;
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
    ctx.stroke();
}

function animate() {
    // Fades the previous frame to create a subtle motion blur effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw and update stars first so they are in the background
    for (let i = 0; i < starsArray.length; i++) {
        starsArray[i].update();
        starsArray[i].draw();
    }
    
    // Draw and update all the different moons
    for (let i = 0; i < moonsArray.length; i++) {
        moonsArray[i].update();
        moonsArray[i].draw();
    }

    drawCore();
    
    // Animate Particles
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        // Draw connections from core to nearby particles
        const dxCore = particlesArray[i].x - core.x;
        const dyCore = particlesArray[i].y - core.y;
        const distanceCore = Math.sqrt(dxCore * dxCore + dyCore * dyCore);

        if (distanceCore < connectionDistance + 50) { 
            ctx.beginPath();
            const opacity = 1 - (distanceCore / (connectionDistance + 50));
            ctx.strokeStyle = `rgba(0, 255, 213, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.moveTo(core.x, core.y);
            ctx.lineTo(particlesArray[i].x, particlesArray[i].y);
            ctx.stroke();
        }

        // Draw the wireframe connections between particles
        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Connect them if they are close enough
            if (distance < connectionDistance) {
                ctx.beginPath();
                let opacity = 1 - (distance / connectionDistance);
                ctx.strokeStyle = `rgba(0, 255, 213, ${opacity * 0.2})`; 
                ctx.lineWidth = 1;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
    
    // Animate 3D Cubes
    for (let i = 0; i < cubesArray.length; i++) {
        cubesArray[i].update();
        cubesArray[i].draw();
    }
    requestAnimationFrame(animate);
}

// Start the animation
init();
animate();