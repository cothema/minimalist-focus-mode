/// <reference types="chrome" />
import {hideElements, getSelectedMode} from "../../lib/utils.js";

const selectors = {
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

const modeMappings = {
  create: [
    selectors.games,
    selectors.adBanners,
    selectors.footer,
    selectors.feedIdentityModule,
    selectors.myNetworkLink,
    selectors.feedFollowsModule,
    selectors.leftMenu,
    selectors.msgOverlay,
    selectors.feed,
    selectors.topMenu
  ],
  networking: [
    selectors.games,
    selectors.adBanners,
    selectors.footer,
    selectors.shareBox,
    selectors.feed,
    selectors.sidebarMyPages
  ],
  inspiration: [
    selectors.games,
    selectors.adBanners,
    selectors.footer,
    selectors.feedIdentityModule,
    selectors.myNetworkLink,
    selectors.feedFollowsModule,
    selectors.leftMenu,
    selectors.msgOverlay,
    selectors.shareBox,
    selectors.sidebarMyPages,
    selectors.topMenu
  ],
  play: [
    selectors.adBanners,
    selectors.footer,
    selectors.feedIdentityModule,
    selectors.myNetworkLink,
    selectors.feedFollowsModule,
    selectors.leftMenu,
    selectors.msgOverlay,
    selectors.shareBox,
    selectors.feed,
    selectors.sidebarMyPages,
    selectors.topMenu
  ]
};

getSelectedMode((mode) => {
  hideElements(modeMappings[mode] || []);
});

new MutationObserver(() => {
  getSelectedMode((mode) => {
    hideElements(modeMappings[mode] || []);
  });
}).observe(document.body, {childList: true, subtree: true});
