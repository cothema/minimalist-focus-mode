/// <reference types="chrome" />

export function hideElements(selectorList) {
  selectorList.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      element.style.setProperty("display", "none", "important");
    });
  });
}

export function getSelectedMode(callback) {
  chrome.storage.sync.get(["selectedMode"], (data) => {
    callback(data.selectedMode);
  });
}
