localStorage.clear();
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
 //does not work, as of 3/12/
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
// --- ANNOUNCEMENT BANNER CONFIG ---
const SHOW_BANNER = false; 
const BANNER_TEXT = "Next season starting May";
const BANNER_LINK = "#"; 

function handleBanner() {
    if (!SHOW_BANNER) return;

    const banner = document.createElement('div');
    banner.className = 'announcement-banner';
    
    const content = BANNER_LINK !== "" 
        ? `<a href="${BANNER_LINK}" target="_blank">[ SIGNAL ACQUIRED ] ${BANNER_TEXT}</a>`
        : `[ SYSTEM NOTICE ] ${BANNER_TEXT}`;

    banner.innerHTML = content;
    document.body.prepend(banner);
}

handleBanner();
document.addEventListener("DOMContentLoaded", () => {
    const splash = document.getElementById('press-start-screen');
    const startBtn = document.getElementById('start-btn');

    // Check if the user has already "Started" before
    if (localStorage.getItem("hasPressedStart")) {
        splash.style.display = 'none'; // Instant hide if they've seen it
    }

    startBtn.addEventListener('click', () => {
        // 1. Play a sound effect (optional)
        // new Audio('start-sound.mp3').play();

        // 2. Hide the screen with the fade effect
        splash.classList.add('hidden');

        // 3. Save the "seen" status in the browser's memory
        localStorage.setItem("hasPressedStart", "true");
    });
});
// --- LEADERBOARD DATA ---
const teamScores = [
    { name: "CAPTAIN", drive: 99, code: 85, hours: 120 },
    { name: "BOT", drive: 75, code: 99, hours: 145 },
    { name: "STRESSTEST", drive: 60, code: 70, hours: 200 },
    { name: "ROOKIE", drive: 40, code: 50, hours: 80 }
];

function updateLeaderboard() {
    const tableBody = document.getElementById('leaderboard-body');
    if (!tableBody) return;

    // 1. Calculate Points and Sort (Points = Drive + Code)
    // You can change this formula however you like!
    const sortedData = teamScores.map(player => ({
        ...player,
        points: player.drive + player.code
    })).sort((a, b) => b.points - a.points);

    // 2. Clear existing rows
    tableBody.innerHTML = '';

    // 3. Build new rows
    sortedData.forEach((player, index) => {
        const rank = index + 1;
        let rankText = `${rank}TH`;
        if (rank === 1) rankText = "1ST";
        if (rank === 2) rankText = "2ND";
        if (rank === 3) rankText = "3RD";

        const row = document.createElement('tr');
        // Add the 'highlight' class to the top player
        if (rank === 1) row.className = 'highlight';

        row.innerHTML = `
            <td>${rankText}</td>
            <td>${player.name}</td>
            <td>${player.drive}</td>
            <td>${player.code}</td>
            <td>${player.points}</td>
            <td>${player.hours}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Run the update
updateLeaderboard();