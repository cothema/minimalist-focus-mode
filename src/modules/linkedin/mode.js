pageParts = {
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
    pageParts.games,
    pageParts.adBanners,
    pageParts.footer,
    pageParts.feedIdentityModule,
    pageParts.myNetworkLink,
    pageParts.feedFollowsModule,
    pageParts.leftMenu,
    pageParts.msgOverlay,
    pageParts.feed,
    pageParts.topMenu
  ],
  networking: [
    pageParts.games,
    pageParts.adBanners,
    pageParts.footer,
    pageParts.shareBox,
    pageParts.feed,
    pageParts.sidebarMyPages
  ],
  inspiration: [
    pageParts.games,
    pageParts.adBanners,
    pageParts.footer,
    pageParts.feedIdentityModule,
    pageParts.myNetworkLink,
    pageParts.feedFollowsModule,
    pageParts.leftMenu,
    pageParts.msgOverlay,
    pageParts.shareBox,
    pageParts.sidebarMyPages,
    pageParts.topMenu
  ],
  play: [
    pageParts.adBanners,
    pageParts.footer,
    pageParts.feedIdentityModule,
    pageParts.myNetworkLink,
    pageParts.feedFollowsModule,
    pageParts.leftMenu,
    pageParts.msgOverlay,
    pageParts.shareBox,
    pageParts.feed,
    pageParts.sidebarMyPages,
    pageParts.topMenu
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
