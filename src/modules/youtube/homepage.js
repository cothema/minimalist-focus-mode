const pageParts = {
  hp: {
    contents: ["ytd-browse #contents"], // All recommended videos
  }
};

const elementsToHide = {
  create: [
    pageParts.hp.contents
  ],
  networking: [
    pageParts.hp.contents
  ],
  inspiration: [],
  play: [
    pageParts.hp.contents
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
  if (window.location.pathname === "/") {
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
  }
})();
