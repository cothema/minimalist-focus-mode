/// <reference types="chrome" />
import { hideElements, getSelectedMode } from "../../lib/utils.js";

const selectors = {
  hp: {
    contents: ["ytd-browse #contents"], // All recommended videos
  }
};

const modeMappings = {
  create: [
    selectors.hp.contents
  ],
  networking: [
    selectors.hp.contents
  ],
  inspiration: [],
  play: [
    selectors.hp.contents
  ]
};

getSelectedMode((mode) => {
  hideElements(modeMappings[mode] || []);
});

new MutationObserver(() => {
  getSelectedMode((mode) => {
    hideElements(modeMappings[mode] || []);
  });
}).observe(document.body, { childList: true, subtree: true });
