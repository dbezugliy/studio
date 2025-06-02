class DotGrid {
    constructor() {
        this.canvas = document.getElementById('dotCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.dots = [];
        this.mouse = { x: 0, y: 0 };
        this.dotSpacing = 50;
        this.dotRadius = 3;
        this.repelDistance = 100;
        this.repelStrength = 10.0;
        this.returnSpeed = 0.05;
        this.time = 0;
        this.floatSpeed = 0.01;
        this.floatAmplitude = 3;
        
        this.init();
        this.animate();
        this.addEventListeners();
    }
    
    init() {
        this.resizeCanvas();
        this.createDots();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createDots() {
        this.dots = [];
        const cols = Math.ceil(this.canvas.width / this.dotSpacing);
        const rows = Math.ceil(this.canvas.height / this.dotSpacing);
        
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const x = i * this.dotSpacing + this.dotSpacing / 2;
                const y = j * this.dotSpacing + this.dotSpacing / 2;
                
                this.dots.push({
                    originalX: x,
                    originalY: y,
                    x: x,
                    y: y,
                    vx: 0,
                    vy: 0,
                    floatOffsetX: Math.random() * Math.PI * 2,
                    floatOffsetY: Math.random() * Math.PI * 2,
                    floatSpeedX: 0.7 + Math.random() * 0.6,
                    floatSpeedY: 0.7 + Math.random() * 0.6,
                    orangeInfluence: 0,
                    lastInfluenceTime: 0
                });
            }
        }
    }
    
    updateDots() {
        this.time += this.floatSpeed;
        const currentTime = Date.now();
        
        this.dots.forEach(dot => {
            // Calculate floating position with reduced amplitude
            const floatX = Math.sin(this.time * dot.floatSpeedX + dot.floatOffsetX) * this.floatAmplitude;
            const floatY = Math.cos(this.time * dot.floatSpeedY + dot.floatOffsetY) * this.floatAmplitude;
            const targetX = dot.originalX + floatX;
            const targetY = dot.originalY + floatY;
            
            const dx = this.mouse.x - dot.x;
            const dy = this.mouse.y - dot.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < this.repelDistance) {
                // Repel from cursor
                const force = (this.repelDistance - distance) / this.repelDistance;
                const angle = Math.atan2(dy, dx);
                
                dot.vx -= Math.cos(angle) * force * this.repelStrength;
                dot.vy -= Math.sin(angle) * force * this.repelStrength;
            }
            
            // Return to floating target position
            const returnDx = targetX - dot.x;
            const returnDy = targetY - dot.y;
            
            dot.vx += returnDx * this.returnSpeed;
            dot.vy += returnDy * this.returnSpeed;
            
            // Apply velocity with damping
            dot.vx *= 0.85;
            dot.vy *= 0.85;
            
            dot.x += dot.vx;
            dot.y += dot.vy;
            
            // Update orange influence with lingering effect
            const distanceFromMouse = Math.sqrt((this.mouse.x - dot.x) ** 2 + (this.mouse.y - dot.y) ** 2);
            
            if (distanceFromMouse < this.repelDistance * 1.5) {
                // Currently influenced by cursor
                const influence = Math.max(0, 1 - (distanceFromMouse / (this.repelDistance * 1.5)));
                dot.orangeInfluence = Math.max(dot.orangeInfluence, influence * 0.8);
                dot.lastInfluenceTime = currentTime;
            } else {
                // Check if we should start fading the orange influence
                const timeSinceLastInfluence = currentTime - dot.lastInfluenceTime;
                if (timeSinceLastInfluence > 1000) { // 1 second delay
                    // Fade out the orange influence
                    dot.orangeInfluence *= 0.95; // Gradual fade
                    if (dot.orangeInfluence < 0.01) {
                        dot.orangeInfluence = 0;
                    }
                }
            }
        });
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.dots.forEach(dot => {
            // Calculate displacement from original position for opacity
            const dispDx = dot.x - dot.originalX;
            const dispDy = dot.y - dot.originalY;
            const displacement = Math.sqrt(dispDx * dispDx + dispDy * dispDy);
            const opacity = Math.max(0.3, 1 - displacement / 30);
            
            // Calculate color based on stored orange influence
            let red = 255;
            let green = 255;
            let blue = 255;
            
            if (dot.orangeInfluence > 0) {
                // Blend from white (255,255,255) to orange (255,165,0)
                red = 255;
                green = Math.floor(255 - (90 * dot.orangeInfluence)); // 255 -> 165
                blue = Math.floor(255 - (255 * dot.orangeInfluence)); // 255 -> 0
            }
            
            this.ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(dot.x, dot.y, this.dotRadius, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    animate() {
        this.updateDots();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
    
    addEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createDots();
        });
        
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        // Handle touch events for mobile
        document.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                this.mouse.x = e.touches[0].clientX;
                this.mouse.y = e.touches[0].clientY;
            }
        });
        
        document.addEventListener('touchend', () => {
            // Move cursor off-screen when touch ends
            this.mouse.x = -100;
            this.mouse.y = -100;
        });
    }
}