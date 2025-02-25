// Add dark theme class to body for all pages except index
if (!window.location.pathname.endsWith('index.html')) {
    document.body.classList.add('dark-theme');
    
    // Create background elements
    const geometricBg = document.createElement('div');
    geometricBg.className = 'geometric-background';
    
    const animatedGrid = document.createElement('div');
    animatedGrid.className = 'animated-grid';
    
    const floatingParticles = document.createElement('div');
    floatingParticles.className = 'floating-particles';
    
    // Add background elements to body
    document.body.prepend(geometricBg);
    document.body.prepend(animatedGrid);
    document.body.prepend(floatingParticles);
    
    // Create floating particles
    const createParticles = () => {
        const particlesContainer = document.querySelector('.floating-particles');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random initial position
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = Math.random() * 100 + 'vh';
            
            // Random size
            const size = Math.random() * 3;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random animation duration and delay
            particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 5) + 's';
            
            particlesContainer.appendChild(particle);
        }
    };
    
    createParticles();
}

// Handle window resize
window.addEventListener('resize', () => {
    if (document.querySelector('.floating-particles')) {
        document.querySelector('.floating-particles').innerHTML = '';
        createParticles();
    }
}); 