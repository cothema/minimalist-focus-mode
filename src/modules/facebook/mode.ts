import { hideElements, getSelectedMode } from '../../lib/utils';

type Selectors = {
  [key: string]: string[];
};

type ModeMappings = {
  [key: string]: string[][];
};

const selectors: Selectors = {
  stories: ["[aria-label='stories tray']"],
  footer: ['footer'],
};

const modeMappings: ModeMappings = {
  create: [selectors.stories, selectors.footer],
  networking: [selectors.stories, selectors.footer],
  inspiration: [selectors.footer],
  play: [selectors.stories, selectors.footer],
};

getSelectedMode((mode: keyof ModeMappings) => {
  hideElements(modeMappings[mode] || []);
});

new MutationObserver(() => {
  getSelectedMode((mode: keyof ModeMappings) => {
    hideElements(modeMappings[mode] || []);
  });
}).observe(document.body, { childList: true, subtree: true });
