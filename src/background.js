chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleMode") {
    // Handle the toggle mode action
    chrome.storage.sync.get("focusedMode", (data) => {
      const newMode = !data.focusedMode;
      chrome.storage.sync.set({ focusedMode: newMode }, () => {
        sendResponse({ success: true, focusedMode: newMode });
      });
    });
    return true; // Keep the message channel open for sendResponse
  }
});
