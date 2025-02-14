document.addEventListener("DOMContentLoaded", () => {
  const modeButtons = document.querySelectorAll(".mode-button");
  const settingsIcon = document.getElementById("settingsIcon");
  const dopaminInfo = document.getElementById("dopaminInfo");
  const dopaminIndex = document.getElementById("dopaminIndexValue");

  chrome.storage.sync.get(["selectedMode"], (data) => {
    const selectedMode = data.selectedMode || "disabled";
    updateDopaminIndex(selectedMode);
    highlightSelectedMode(selectedMode);
    updateExtensionIcon(selectedMode);
  });

  modeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selectedMode = button.getAttribute("data-mode");
      chrome.storage.sync.set({selectedMode: selectedMode}, () => {
        updateDopaminIndex(selectedMode);
        highlightSelectedMode(selectedMode);
        updateExtensionIcon(selectedMode);
        chrome.runtime.sendMessage({action: "reloadPage"});
        window.close();
      });
    });
  });

  settingsIcon.addEventListener("click", () => {
    chrome.tabs.create({url: "src/settings/settings.html"});
  });

  dopaminInfo.addEventListener("click", () => {
    chrome.tabs.create({url: "src/settings/settings.html"});
  });

  function updateDopaminIndex(mode) {
    let index = 0;
    switch (mode) {
      case "create":
        index = 100;
        break;
      case "networking":
        index = 30;
        break;
      case "analytics":
        index = 20;
        break;
      case "inspiration":
        index = 10;
        break;
      case "play":
      case "disabled":
        index = 0;
        break;
    }
    dopaminIndex.textContent = `${index}%`;
    dopaminIndex.style.color = `rgb(${255 - (index * 2.55)}, ${index * 2.55}, 0)`;
  }

  function highlightSelectedMode(mode) {
    modeButtons.forEach(button => {
      button.classList.toggle("enabled", button.getAttribute("data-mode") === mode);

      const isDisabled = button.getAttribute("data-mode") === "disabled";
      button.style.display = (mode === "disabled" && isDisabled) ? "none" : "block";
    });
  }

  function updateExtensionIcon(mode) {
    let iconPath = `../../icons/mode/${mode}.png`;
    chrome.action.setIcon({path: iconPath});
  }
});
