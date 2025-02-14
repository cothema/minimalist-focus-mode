constParts = {
  games: [".games-entrypoints-module__subheader", ".games-entrypoints-module__puzzle"],
  adBanners: [".ad-banner-container"],
  footer: ["footer"],
  feedIdentityModule: [".feed-identity-module"],
  feedFollowsModule: [".feed-follows-module"], // Add to feed recommendations
  myNetworkLink: ["li a[href='https://www.linkedin.com/mynetwork/']"],
  leftMenu: [".scaffold-layout__sticky"],
  msgOverlay: ["#msg-overlay"],
  shareBox: [".share-box-feed-entry__closed-share-box"],
  feed: [".scaffold-finite-scroll", ".feed-sort-toggle-dsa__wrapper"],
  sidebarMyPages: [".org-organization-admin-pages-entrypoint-card__card"],
  topMenu: [".global-nav__nav"]
};

const elementsToToggle = {
  create: [
    constParts.games,
    constParts.adBanners,
    constParts.footer,
    constParts.feedIdentityModule,
    constParts.myNetworkLink,
    constParts.feedFollowsModule,
    constParts.leftMenu,
    constParts.msgOverlay,
    constParts.feed,
    constParts.topMenu
  ],
  networking: [
    constParts.games,
    constParts.adBanners,
    constParts.footer,
    constParts.shareBox,
    constParts.feed,
    constParts.sidebarMyPages
  ],
  inspiration: [
    constParts.games,
    constParts.adBanners,
    constParts.footer,
    constParts.feedIdentityModule,
    constParts.myNetworkLink,
    constParts.feedFollowsModule,
    constParts.leftMenu,
    constParts.msgOverlay,
    constParts.shareBox,
    constParts.sidebarMyPages,
    constParts.topMenu
  ],
  play: [
    constParts.adBanners,
    constParts.footer,
    constParts.feedIdentityModule,
    constParts.myNetworkLink,
    constParts.feedFollowsModule,
    constParts.leftMenu,
    constParts.msgOverlay,
    constParts.shareBox,
    constParts.feed,
    constParts.sidebarMyPages,
    constParts.topMenu
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
