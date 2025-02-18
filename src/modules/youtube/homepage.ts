import { hideElements, getSelectedMode } from '../../lib/utils';
import { SettingsFilteredWebsites } from '../../lib/settings/filteredWebsites';

type Selectors = {
  hp: {
    contents: string[];
  };
};

type ModeMappings = {
  [key: string]: string[][];
};

const selectors: Selectors = {
  hp: {
    contents: ['ytd-browse #contents'], // All recommended videos
  },
};

const modeMappings: ModeMappings = {
  create: [selectors.hp.contents],
  networking: [selectors.hp.contents],
  inspiration: [],
  play: [selectors.hp.contents],
};

chrome.storage.sync.get(['filteredWebsitesSettings'], (result: any) => {
  const data = result.filteredWebsitesSettings as SettingsFilteredWebsites | undefined;
  if (data?.youtube) {
    getSelectedMode((mode: keyof ModeMappings) => {
      hideElements(modeMappings[mode] || []);
    });

    new MutationObserver(() => {
      getSelectedMode((mode: keyof ModeMappings) => {
        hideElements(modeMappings[mode] || []);
      });
    }).observe(document.body, { childList: true, subtree: true });
  }
});
