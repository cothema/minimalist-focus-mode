function applyGrayscale(percentage: number) {
  document.documentElement.style.filter = `grayscale(${percentage}%)`;
}

function removeGrayscale() {
  document.documentElement.style.filter = '';
}

function updateGrayscale() {
  chrome.storage.sync.get(['toolsSettings', 'selectedMode'], (result: any) => {
    const toolsSettings = result.toolsSettings;
    const selectedMode = result.selectedMode;

    if (toolsSettings?.grayscale && selectedMode !== 'disabled') {
      applyGrayscale(toolsSettings.grayscalePercentage || 100);
    } else {
      removeGrayscale();
    }
  });
}

// Observe storage changes and update dynamically
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && (changes.toolsSettings || changes.modeSettings)) {
    updateGrayscale();
  }
});

// Initialize grayscale settings on page load
updateGrayscale();
