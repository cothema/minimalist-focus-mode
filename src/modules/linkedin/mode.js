constParts = {
  games: [".games-entrypoints-module__subheader", ".games-entrypoints-module__puzzle"],
  adBanners: [".ad-banner-container"],
  footer: ["footer"],
  feedIdentityModule: [".feed-identity-module"],
  feedFollowsModule: [".feed-follows-module"], // Add to feed recommendations
  myNetworkLink: ["li a[href='https://www.linkedin.com/mynetwork/']"]
};

const elementsToToggle = {
  create: [
    constParts.games,
    constParts.adBanners,
    constParts.footer,
    constParts.feedIdentityModule,
    constParts.myNetworkLink,
    constParts.feedFollowsModule
  ],
  networking: [
    constParts.games,
    constParts.adBanners,
    constParts.footer
  ],
  inspiration: [
    constParts.games,
    constParts.adBanners,
    constParts.footer,
    constParts.feedIdentityModule,
    constParts.myNetworkLink,
    constParts.feedFollowsModule
  ],
  play: [
    constParts.adBanners,
    constParts.footer,
    constParts.feedIdentityModule,
    constParts.myNetworkLink,
    constParts.feedFollowsModule
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

  chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "toggleMode") {
      if (request.focused) {
        hideElements(request.mode);
      } else {
        showElements(request.mode);
      }
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
