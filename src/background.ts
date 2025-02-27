chrome.runtime.onStartup.addListener(() => {
  chrome.storage.sync.get(['selectedMode'], (data: any) => {
    const selectedMode = data.selectedMode || 'disabled';
    updateExtensionIcon(selectedMode);
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'reloadPage') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      chrome.tabs.reload(tabs[0].id);
    });
  }
});

function updateExtensionIcon(mode: string) {
  const iconPath = `../assets/icons/mode/${mode}.png`;
  chrome.action.setIcon({ path: iconPath });
}
