document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleMode");

  chrome.storage.sync.get("focusedMode", (data) => {
    const isFocused = data.focusedMode || false;
    updateButtonState(isFocused);
  });

  toggleButton.addEventListener("click", () => {
    chrome.storage.sync.get("focusedMode", (data) => {
      const newMode = !data.focusedMode;
      chrome.storage.sync.set({ focusedMode: newMode }, () => {
        updateButtonState(newMode);
        chrome.runtime.sendMessage({ action: "toggleMode" }, (response) => {
          if (response && response.success) {
            console.log("Mode toggled successfully");
          }
        });
      });
    });
  });

  function updateButtonState(isFocused) {
    console.log(`User request: ${isFocused ? "enable" : "disable"} focus mode`);
    toggleButton.textContent = isFocused ? "Disable" : "Enable";
    toggleButton.className = isFocused ? "enabled" : "disabled";
  }
});
