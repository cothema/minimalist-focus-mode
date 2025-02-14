pageParts = {
  stories: [`[aria-label="stories tray"]`],
  footer: [`footer`],
};

const elementsToToggle = {
  create: [
    pageParts.stories,
    pageParts.footer
  ],
  networking: [
    pageParts.stories,
    pageParts.footer
  ],
  inspiration: [
    pageParts.footer
  ],
  play: [
    pageParts.stories,
    pageParts.footer
  ]
};

function toggleElements(action, mode) {
  const selectors = elementsToToggle[mode] || [];
  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      if (action === "hide") {
        el.style.setProperty("display", "none", "important");
      } else {
        el.style.removeProperty("display");
      }
    });
  });
}

(function () {
  const hideElements = (mode) => {
    console.log(`Hiding elements for mode: ${mode}`);
    toggleElements("hide", mode);
  };

  const showElements = (mode) => {
    console.log(`Showing elements for mode: ${mode}`);
    toggleElements("show", mode);
  };

  chrome.storage.sync.get(["focusedMode", "selectedMode"], (data) => {
    if (data.focusedMode) {
      hideElements(data.selectedMode);
    }
  });

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        chrome.storage.sync.get("selectedMode", (data) => {
          toggleElements("hide", data.selectedMode);
        });
      }
    }
  });

  observer.observe(document.body, {childList: true, subtree: true});
})();
