// Initialize the dot grid when the page loads
window.addEventListener('load', () => {
    new DotGrid();
    
    // Initialize carousel if on the main page
    if (document.querySelector('.daily-challenges-section')) {
        new ChallengeCarousel();
    }
});

// Daily Challenges Carousel Class
class ChallengeCarousel {
    constructor() {
        this.videoNotes = [
            "I love the map animations used in \"Jet Lag: The Game\" videos, so I thought i'd try and recreate the styling. It was the first time really using the GeoLayers plugin to make something, and I'm happy with how it turned out!",
            "This was tough. Was trying recreate a water droplet effect that would displace a video properly as done in a @RC_REJECT promotion, but I couldn't get it quite right. Especially, the water drip at the top looks bad, but I ran out of time to keep working. I imagine they didn't use After Effects for this shot. Will have to revisit this one.",
            "Messed around with simple text pop-in and icon animations. A lot of videos try and grab the viewer's attention this way, and I think @maxklymenko does it well. Of course it's more interesting to try to recreate more complicated effects, but optimizing the basics is also important.",
            "Point clouds. I just wanted to work with some point clouds. They have always been on my mind but I never implemented it in editing. So, I took a video I shot at an art exibit, mixed it with some gaussian splatting, and voilà.",
            ""
        ];


        this.currentIndex = 0;
        this.totalItems = 5;
        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
        this.threshold = 50;
        this.dragOffset = 0;
        this.transitionProgress = 0; // 0 = current state, 1 = next state, -1 = prev state
        this.targetIndex = 0; // The index we're transitioning towards
        
        this.container = document.querySelector('.carousel-container');
        this.track = document.querySelector('.carousel-track');
        this.items = document.querySelectorAll('.carousel-item');
        this.title = document.getElementById('challengeTitle');
        
        this.init();

        document.getElementById('prevBtn').addEventListener('click', () => this.goToPrevious());
        document.getElementById('nextBtn').addEventListener('click', () => this.goToNext());
    }
    
    init() {
        this.updateCarousel();
        this.addEventListeners();
        this.playCurrentVideo();
    }
    
    addEventListeners() {
        // Mouse events
        this.container.addEventListener('mousedown', (e) => this.handleStart(e));
        this.container.addEventListener('mousemove', (e) => this.handleMove(e));
        this.container.addEventListener('mouseup', (e) => this.handleEnd(e));
        this.container.addEventListener('mouseleave', (e) => this.handleEnd(e));
        
        // Touch events for mobile
        this.container.addEventListener('touchstart', (e) => this.handleStart(e.touches[0]));
        this.container.addEventListener('touchmove', (e) => {
            e.preventDefault();
            this.handleMove(e.touches[0]);
        });
        this.container.addEventListener('touchend', (e) => this.handleEnd(e));
        
        // Prevent context menu on right click
        this.container.addEventListener('contextmenu', (e) => e.preventDefault());
    }
    
    handleStart(e) {
        this.isDragging = true;
        this.startX = e.clientX;
        this.dragOffset = 0;
        this.transitionProgress = 0;
        this.targetIndex = this.currentIndex;
        this.container.style.cursor = 'grabbing';
        
        // Disable transitions during drag
        this.items.forEach(item => {
            item.style.transition = 'none';
        });
    }
    
    handleMove(e) {
        if (!this.isDragging) return;
        
        this.currentX = e.clientX;
        this.dragOffset = this.currentX - this.startX;
        
        // Calculate transition progress based on drag distance
        const maxDragDistance = 700; // Distance for full transition
        const rawProgress = this.dragOffset / maxDragDistance;
        
        // Determine direction and target
        if (rawProgress > 0) {
            // Dragging right - go to previous
            this.targetIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
            this.transitionProgress = Math.min(rawProgress, 1);
        } else if (rawProgress < 0) {
            // Dragging left - go to next
            this.targetIndex = (this.currentIndex + 1) % this.totalItems;
            this.transitionProgress = Math.max(rawProgress, -1);
        } else {
            // No significant drag
            this.targetIndex = this.currentIndex;
            this.transitionProgress = 0;
        }
        
        // Update carousel with transition progress
        this.updateCarouselWithTransition();
    }
    
    handleEnd(e) {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.container.style.cursor = 'grab';
        
        // Re-enable transitions
        this.items.forEach(item => {
            item.style.transition = 'all 0.3s ease';
        });
        
        // Determine if we should complete the transition
        const shouldTransition = Math.abs(this.transitionProgress) > 0.3; // 30% threshold
        
        if (shouldTransition) {
            // Complete the transition to target
            this.currentIndex = this.targetIndex;
            
        }
        
        // Reset transition state and update to final positions
        this.transitionProgress = 0;
        this.targetIndex = this.currentIndex;
        this.updateCarousel();
        this.dragOffset = 0;
        this.playCurrentVideo();
    }
    
    updateCarouselWithTransition() {
        this.items.forEach((item, index) => {
            // Get current position (where item should be now)
            const currentRelativeIndex = (index - this.currentIndex + this.totalItems) % this.totalItems;
            const currentPosition = this.getItemPosition(currentRelativeIndex);
            
            // Get target position (where item should be after transition)
            const targetRelativeIndex = (index - this.targetIndex + this.totalItems) % this.totalItems;
            const targetPosition = this.getItemPosition(targetRelativeIndex);
            
            // Interpolate between current and target based on transition progress
            const progress = Math.abs(this.transitionProgress);
            const interpolatedPosition = this.interpolatePosition(currentPosition, targetPosition, progress);
            
            item.style.transform = `translateX(${interpolatedPosition.x}px) scale(${interpolatedPosition.scale})`;
            item.style.opacity = interpolatedPosition.opacity;
            item.style.zIndex = interpolatedPosition.zIndex;
        });
        
        // Update title with transition progress
        const currentDay = this.currentIndex + 1;
        const targetDay = this.targetIndex + 1;
        
        if (this.transitionProgress === 0) {
            this.title.textContent = `DAILY CHALLENGE: DAY ${currentDay}`;
        } else {
            // Show transitioning state
            const progress = Math.abs(this.transitionProgress);
            if (progress > 0.5) {
                this.title.textContent = `DAILY CHALLENGE: DAY ${targetDay}`;
            } else {
                this.title.textContent = `DAILY CHALLENGE: DAY ${currentDay}`;
            }
        }
    }
    
    interpolatePosition(current, target, progress) {
        return {
            x: current.x + (target.x - current.x) * progress,
            scale: current.scale + (target.scale - current.scale) * progress,
            opacity: current.opacity + (target.opacity - current.opacity) * progress,
            zIndex: Math.round(current.zIndex + (target.zIndex - current.zIndex) * progress)
        };
    }
    
    getItemPosition(relativeIndex) {
        let baseX = 0;
        let scale = 0.6;
        let opacity = 0.2;
        let zIndex = 0;
        
        // Calculate base positions for each slot
        switch(relativeIndex) {
            case 0: // active (center)
                baseX = 0;
                scale = 1;
                opacity = 1;
                zIndex = 3;
                break;
            case 1: // next (right)
                baseX = 300;
                scale = 0.8;
                opacity = 0.4;
                zIndex = 1;
                break;
            case this.totalItems - 1: // prev (left)
                baseX = -300;
                scale = 0.8;
                opacity = 0.4;
                zIndex = 1;
                break;
            case 2: // far-next (far right)
                baseX = 450;
                scale = 0.6;
                opacity = 0.2;
                zIndex = 0;
                break;
            case this.totalItems - 2: // far-prev (far left)
                baseX = -450;
                scale = 0.6;
                opacity = 0.2;
                zIndex = 0;
                break;
        }
        
        return {
            x: baseX,
            scale: scale,
            opacity: opacity,
            zIndex: zIndex
        };
    }

    updateNotes() {
        const notesElement = document.getElementById('videoNotes');
        if (notesElement) {
            notesElement.textContent = this.videoNotes[this.currentIndex];
        }
    }
    
    goToNext() {
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
        this.updateCarousel();
        this.playCurrentVideo();
        this.updateNotes();
    }
    
    goToPrevious() {
        this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
        this.updateCarousel();
        this.playCurrentVideo();
        this.updateNotes();
    }
    
    updateCarousel() {
        this.items.forEach((item, index) => {
            // Remove all position classes
            item.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');
            
            const relativeIndex = (index - this.currentIndex + this.totalItems) % this.totalItems;
            const position = this.getItemPosition(relativeIndex);
            
            // Apply position via transform
            item.style.transform = `translateX(${position.x}px) scale(${position.scale})`;
            item.style.opacity = position.opacity;
            item.style.zIndex = position.zIndex;
            
            // Add appropriate class for styling consistency
            switch(relativeIndex) {
                case 0:
                    item.classList.add('active');
                    break;
                case 1:
                    item.classList.add('next');
                    break;
                case this.totalItems - 1:
                    item.classList.add('prev');
                    break;
                case 2:
                    item.classList.add('far-next');
                    break;
                case this.totalItems - 2:
                    item.classList.add('far-prev');
                    break;
            }
        });
        
        // Update title
        const currentDay = this.currentIndex + 1;
        this.title.textContent = `DAILY CHALLENGE: DAY ${currentDay}`;
        this.updateNotes();
    }
    
    playCurrentVideo() {
        // Pause all videos first
        this.items.forEach(item => {
            const video = item.querySelector('.challenge-video');
            video.pause();
            video.currentTime = 0;
        });
        
        // Play the current (active) video
        const activeItem = document.querySelector('.carousel-item.active');
        if (activeItem) {
            const activeVideo = activeItem.querySelector('.challenge-video');
            activeVideo.play().catch(e => {
                // Handle autoplay restrictions
                console.log('Autoplay prevented:', e);
            });
        }
    }
}

// Optional: Add any other initialization code here
// For example, you could add smooth scrolling, lazy loading for videos, etc.

// Smooth scrolling for any anchor links (if you add navigation later)
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Optional: Add performance monitoring for the animation
if (window.performance && window.performance.mark) {
    window.addEventListener('load', () => {
        performance.mark('dotgrid-start');
    });
}