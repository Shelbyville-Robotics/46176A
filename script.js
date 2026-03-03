window.addEventListener('load', () => {
    const loader = document.getElementById('loader-wrapper');
    const content = document.getElementById('content');

    // Small timeout so you can actually see the cool animation
    setTimeout(() => {
        loader.style.opacity = '0';
        
        // Remove from DOM and show content
        setTimeout(() => {
            loader.style.display = 'none';
            content.classList.remove('hidden');
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }, 800);
    }, 2000); 
});