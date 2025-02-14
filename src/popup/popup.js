document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggleMode");
  const modePicker = document.getElementById("modePicker");

  chrome.storage.sync.get(["focusedMode", "selectedMode"], (data) => {
    const isFocused = data.focusedMode || false;
    const selectedMode = data.selectedMode || "create";
    updateButtonState(isFocused);
    modePicker.value = selectedMode;
  });

  toggleButton.addEventListener("click", () => {
    toggleFocusMode();
  });

  modePicker.addEventListener("change", () => {
    chrome.storage.sync.get("focusedMode", (data) => {
      if (!data.focusedMode) {
        toggleFocusMode();
      } else {
        chrome.storage.sync.set({ selectedMode: modePicker.value }, () => {
          chrome.runtime.sendMessage({ action: "reloadPage" });
          window.close();
        });
      }
    });
  });

  function toggleFocusMode() {
    chrome.storage.sync.get("focusedMode", (data) => {
      const newMode = !data.focusedMode;
      const selectedMode = modePicker.value;
      chrome.storage.sync.set({ focusedMode: newMode, selectedMode: selectedMode }, () => {
        updateButtonState(newMode);
        chrome.runtime.sendMessage({ action: "toggleMode", mode: selectedMode }, (response) => {
          if (response && response.success) {
            console.log("Mode toggled successfully");
            chrome.runtime.sendMessage({ action: "reloadPage" });
            window.close();
          }
        });
      });
    });
  }

  function updateButtonState(isFocused) {
    console.log(`User request: ${isFocused ? "enable" : "disable"} focus mode`);
    toggleButton.textContent = isFocused ? "Disable" : "Enable";
    toggleButton.className = isFocused ? "enabled" : "disabled";
  }
});
