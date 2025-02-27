import { hideElements, getSelectedMode } from '../../lib/utils';
import { SettingsFilteredWebsites } from '../../lib/settings/filteredWebsites';

type Selectors = {
  [key: string]: string[];
};

type ModeMappings = {
  [key: string]: string[][];
};

const selectors: Selectors = {
  stories: ["[aria-label='stories tray']"],
  footer: ['footer'],
  notifications: [
    'div[aria-expanded="false"][aria-label*="Notifications"][role="button"]',
    'div[aria-hidden="true"][aria-label*="Notifications"][role="button"]',
  ],
};

const modeMappings: ModeMappings = {
  create: [selectors.stories, selectors.footer, selectors.notifications],
  networking: [selectors.stories, selectors.footer, selectors.notifications],
  inspiration: [selectors.footer, selectors.notifications],
  play: [selectors.stories, selectors.footer, selectors.notifications],
};

const removeNotificationCount = () => {
  document.title = document.title.replace(/^\(\d+\)\s*/, '');
};

chrome.storage.sync.get(['filteredWebsitesSettings'], (result: any) => {
  const data = result.filteredWebsitesSettings as SettingsFilteredWebsites | undefined;
  if (data?.facebook) {
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
