// Assets Page Interactive Features

// Load and Render Assets from JSON
async function loadAssets() {
    try {
        const response = await fetch('./data/assets-data.json');
        const assets = await response.json();
        renderAssets(assets);
    } catch (error) {
        console.error('Error loading assets:', error);
        showToast('Failed to load assets. Please refresh the page.');
    }
}

function getPromptPreview(prompt, wordLimit = 20) {
  if (!prompt) return "";

  const words = prompt.trim().split(/\s+/);

  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "…"
    : prompt.trim();
}


// Render Asset Cards
function renderAssets(assets) {
    const container = document.getElementById('assets-container');
    if (!container) return;

    container.innerHTML = assets.map(asset => `
        <!-- Asset Card ${asset.id} -->
        <div class="break-inside-avoid mb-4 group" data-aos="fade-up" data-aos-delay="${asset.aosDelay}">
            <div class="rounded-xl overflow-hidden border border-border-color bg-card-bg shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                
                <!-- Asset Image -->
                <div class="relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <img src="${asset.image}" alt="${asset.title}"
                        class="w-full h-auto max-h-80 object-cover transition-transform duration-500 group-hover:scale-110" />
                    
                    <!-- Hover Overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <a href="${asset.instagramUrl}" target="_blank" title="Visit Instagram Post"
                            class="flex items-center justify-center gap-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:scale-105 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" x2="21" y1="14" y2="3"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- Card Content -->
                <div class="p-4 space-y-3">
                    <h3 class="font-heading font-bold text-sm text-text-primary">${asset.title}</h3>
                    
                    <!-- Prompt Preview -->
                    <p class="text-xs text-text-primary/60 font-body line-clamp-2" id="preview${asset.id}">
                        ${getPromptPreview(asset.prompt)}
                    </p>

                    <!-- Full Prompt (Hidden by default) -->
                    <div id="fullPrompt${asset.id}" class="prompt-text bg-background/50 backdrop-blur p-3 rounded-lg">
                        <p class="text-xs font-mono text-text-primary">
                            ${asset.prompt}
                        </p>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex flex-col items-stretch gap-2 text-xs">
                        <button onclick="togglePrompt('fullPrompt${asset.id}')" title="View Full Prompt"
                            class="w-full flex items-center justify-center gap-1 text-accent-secondary font-semibold hover:text-accent-primary transition-colors py-2 border border-accent-secondary rounded-lg hover:bg-accent-secondary/10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        </button>
                        <button onclick='copyPrompt(\`${asset.prompt.replace(/`/g, '\\`')}\`, this)' title="Copy Prompt"
                            class="copy-btn w-full flex items-center justify-center gap-1 bg-accent-primary text-white font-semibold py-2 px-3 rounded-lg hover:bg-accent-secondary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Refresh AOS animations after rendering
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// Copy Prompt to Clipboard
function copyPrompt(promptText, button) {
    navigator.clipboard.writeText(promptText).then(() => {
        // Add copied class for button animation
        button.classList.add('copied');

        // Show toast notification
        showToast('Prompt copied! Now go create magic ✨');

        // Remove copied class after animation
        setTimeout(() => {
            button.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        showToast('Failed to copy. Please try again.');
    });
}

// Toggle Prompt Visibility
function togglePrompt(promptId) {
    const promptElement = document.getElementById(promptId);
    promptElement.classList.toggle('expanded');
}

// Show Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Download Asset (placeholder - you can customize this)
function downloadAsset(assetUrl, assetName) {
    const link = document.createElement('a');
    link.href = assetUrl;
    link.download = assetName || 'asset.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Asset downloaded! 🎨');
}

// Smooth scroll to section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Load assets when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadAssets();
});
