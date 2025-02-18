import { hideElements, getSelectedMode } from '../../lib/utils';
import { SettingsFilteredWebsites } from '../../lib/filteredWebsites';

type Selectors = {
  [key: string]: string[];
};

type ModeMappings = {
  [key: string]: string[][];
};

const selectors: Selectors = {
  footer: ['footer'],
  notifications: ['notification-indicator'],
  feed: ['#dashboard feed-container'],
};

const modeMappings: ModeMappings = {
  create: [selectors.footer, selectors.feed, selectors.notifications],
  networking: [selectors.footer, selectors.feed, selectors.notifications],
  inspiration: [selectors.footer, selectors.notifications],
  play: [selectors.footer, selectors.feed, selectors.notifications],
};

const removeNotificationCount = () => {
  document.title = document.title.replace(/^\(\d+\)\s*/, '');
};

chrome.storage.sync.get(['filteredWebsitesSettings'], (result: any) => {
  const data = result.filteredWebsitesSettings as SettingsFilteredWebsites | undefined;
  if (data?.github) {
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
