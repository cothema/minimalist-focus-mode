const pageParts = {
  stories: [`[aria-label="stories tray"]`],
  footer: [`footer`],
};

const elementsToHide = {
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

function hideElements(mode) {
  const selectors = elementsToHide[mode] || [];
  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.style.setProperty("display", "none", "important");
    });
  });
}

(function () {
  chrome.storage.sync.get(["selectedMode"], (data) => {
    hideElements(data.selectedMode);
  });

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        chrome.storage.sync.get("selectedMode", (data) => {
          hideElements(data.selectedMode);
        });
      }
    }
  });

  observer.observe(document.body, {childList: true, subtree: true});
})();
