const elementsToToggle = {
  linkedInGames: [".games-entrypoints-module__subheader", ".games-entrypoints-module__puzzle"],
  adBanners: [".ad-banner-container"],
  footer: ["footer"],
  feedIdentityModule: [".feed-identity-module"],
  myNetworkLink: ["li a[href='https://www.linkedin.com/mynetwork/']"]
};

function toggleElements(action) {
  Object.values(elementsToToggle).forEach(selectors => {
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (action === "hide") {
          el.style.setProperty("display", "none", "important");
        } else {
          el.style.removeProperty("display");
        }
      });
    });
  });
}

(function () {
  const hideElements = () => {
    console.log('Hiding elements.');
    toggleElements("hide");
  };

  const showElements = () => {
    console.log('Showing elements.');
    toggleElements("show");
  };

  chrome.storage.sync.get("focusedMode", (data) => {
    console.log('Focus mode enabled.');
    if (data.focusedMode) {
      hideElements();
    }
  });

  chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "toggleMode") {
      if (request.focused) {
        console.log('Enabling focus mode.');
        hideElements();
      } else {
        console.log('Disabling focus mode.');
        showElements();
      }
    }
  });

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        toggleElements("hide");
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
