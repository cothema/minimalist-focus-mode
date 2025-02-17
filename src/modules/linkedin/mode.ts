import { hideElements, getSelectedMode } from '../../lib/utils';
import { SettingsFilteredWebsites } from '../../lib/filteredWebsites';

type Selectors = {
  [key: string]: string[];
};

type ModeMappings = {
  [key: string]: string[][];
};

const selectors: Selectors = {
  games: ['.games-entrypoints-module__subheader', '.games-entrypoints-module__puzzle'],
  adBanners: ['.ad-banner-container'],
  footer: ['footer'],
  feedIdentityModule: ['.feed-identity-module'],
  feedFollowsModule: ['.feed-follows-module'], // Add to feed recommendations
  myNetworkLink: ["li a[href='https://www.linkedin.com/mynetwork/']"],
  leftMenu: ['.scaffold-layout__sticky'],
  msgOverlay: ['#msg-overlay'],
  shareBox: ['.share-box-feed-entry__closed-share-box'],
  feed: ['.scaffold-finite-scroll', '.feed-sort-toggle-dsa__wrapper'],
  sidebarMyPages: ['.org-organization-admin-pages-entrypoint-card__card'],
  sidebarMyPagesNotifications: [
    "a[href*='/admin/notifications/'].org-organization-admin-pages-entrypoint-card__link",
  ],
  topMenu: ['.global-nav__nav'],
};

const modeMappings: ModeMappings = {
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
    selectors.topMenu,
    selectors.sidebarMyPagesNotifications,
  ],
  networking: [
    selectors.games,
    selectors.adBanners,
    selectors.footer,
    selectors.shareBox,
    selectors.feed,
    selectors.sidebarMyPages,
    selectors.sidebarMyPagesNotifications,
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
    selectors.topMenu,
    selectors.sidebarMyPagesNotifications,
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
    selectors.topMenu,
    selectors.sidebarMyPagesNotifications,
  ],
};

const removeNotificationCount = () => {
  document.title = document.title.replace(/^\(\d+\)\s*/, '');
};

chrome.storage.sync.get(['filteredWebsitesSettings'], (result: any) => {
  const data = result.filteredWebsitesSettings as SettingsFilteredWebsites | undefined;
  if (data?.linkedin) {
    removeNotificationCount();

    getSelectedMode((mode: keyof ModeMappings) => {
      hideElements(modeMappings[mode] || []);
    });

    new MutationObserver(() => {
      getSelectedMode((mode: keyof ModeMappings) => {
        hideElements(modeMappings[mode] || []);
      });
      removeNotificationCount();
    }).observe(document.body, { childList: true, subtree: true });
  }
});
