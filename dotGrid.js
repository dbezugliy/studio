class DotGrid {
    constructor() {
        this.canvas = document.getElementById('dotCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.dots = [];
        this.mouse = { x: 0, y: 0 };
        this.dotSpacing = 35; // Increased density (was 40)
        this.dotRadius = 2;
        this.repelDistance = 80;
        this.repelStrength = 0.3;
        this.returnSpeed = 0.05;
        this.time = 0;
        this.floatSpeed = 0.01;
        this.floatAmplitude = 3; // Reduced floating (was 8)
        
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
                    floatSpeedX: 0.7 + Math.random() * 0.6, // Slower floating
                    floatSpeedY: 0.7 + Math.random() * 0.6
                });
            }
        }
    }
    
    updateDots() {
        this.time += this.floatSpeed;
        
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
        });
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.dots.forEach(dot => {
            // Calculate opacity based on distance from original position
            const dx = dot.x - dot.originalX;
            const dy = dot.y - dot.originalY;
            const displacement = Math.sqrt(dx * dx + dy * dy);
            const opacity = Math.max(0.3, 1 - displacement / 30);
            
            this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
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