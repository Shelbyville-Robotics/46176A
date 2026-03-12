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
function displayFiles(filesToDisplay) {
    const fileListContainer = document.getElementById('file-list');
    fileListContainer.innerHTML = ''; 

    if (filesToDisplay.length === 0) {
        fileListContainer.innerHTML = `<p class="no-results">No matching documents found.</p>`;
        return;
    }

    filesToDisplay.forEach(file => {
        // Split filename by underscores: [Date, Category, Name]
        const parts = file.name.split('_');
        
        let date = "Unknown Date";
        let category = "General";
        let displayName = file.name;

        // If they followed the SOP: YYYY-MM-DD_Category_Name.ext
        if (parts.length >= 3) {
            date = parts[0];
            category = parts[1];
            // Get the name and remove the extension
            displayName = parts.slice(2).join(' ').replace(/\.[^/.]+$/, "");
        } else {
            // Fallback for files that don't follow the rules
            displayName = file.name.replace(/_/g, ' ').replace(/\.[^/.]+$/, "");
        }

        const ext = file.name.split('.').pop().toUpperCase();
        
        const card = document.createElement('div');
        card.className = 'doc-card';
        card.innerHTML = `
            <div class="doc-icon">📄</div>
            <div class="doc-info">
                <span class="doc-category">${category}</span>
                <h3>${displayName}</h3>
                <div class="doc-meta">
                    <span class="file-type">${ext}</span>
                    <span class="last-updated">Updated: ${date}</span>
                </div>
            </div>
            <a href="${file.download_url}" target="_blank" class="download-link">Open</a>
        `;
        fileListContainer.appendChild(card);
    });
}
async function fetchGallery() {
    const galleryContainer = document.getElementById('robot-gallery');
    if (!galleryContainer) return;

    try {
        const response = await fetch(`https://api.github.com/repos/${USERNAME}/${repo}/contents/gallery`);
        const data = await response.json();

        galleryContainer.innerHTML = ''; // Clear loading text

        data.forEach(file => {
            if (file.type === 'file' && isImage(file.name)) {
                const item = document.createElement('div');
                item.className = 'gallery-item';
                item.innerHTML = `
                    <img src="${file.download_url}" alt="Robot Photo">
                    <div class="gallery-overlay"></div>
                `;
                galleryContainer.appendChild(item);
            }
        });
    } catch (error) {
        console.error("Gallery Error:", error);
    }
}

// Helper to check if file is an image
function isImage(filename) {
    return /\.(jpg|jpeg|png|webp|gif)$/i.test(filename);
}

// Run it
fetchGallery();