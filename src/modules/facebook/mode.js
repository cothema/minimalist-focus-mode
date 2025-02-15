/// <reference types="chrome" />
import {hideElements, getSelectedMode} from "../../lib/utils.js";

const selectors = {
  stories: [`[aria-label="stories tray"]`],
  footer: [`footer`],
};

const modeMappings = {
  create: [
    selectors.stories,
    selectors.footer
  ],
  networking: [
    selectors.stories,
    selectors.footer
  ],
  inspiration: [
    selectors.footer
  ],
  play: [
    selectors.stories,
    selectors.footer
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
