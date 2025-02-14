chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleMode") {
    chrome.storage.sync.get("focusedMode", (data) => {
      const newMode = !data.focusedMode;
      chrome.storage.sync.set({ focusedMode: newMode }, () => {
        sendResponse({ success: true, focusedMode: newMode });
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.tabs.sendMessage(tabs[0].id, { action: "toggleMode", focused: newMode, mode: request.mode });
        });
      });
    });
    return true; // Keep the message channel open for sendResponse
  } else if (request.action === "reloadPage") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.reload(tabs[0].id);
    });
  }
});
