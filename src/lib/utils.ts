export function hideElements(selectorList: string[][]): void {
  selectorList.forEach((selectors) => {
    document.querySelectorAll(selectors.join(', ')).forEach((element) => {
      (element as HTMLElement).style.setProperty('display', 'none', 'important');
    });
  });
}

export function getSelectedMode(callback: (mode: string) => void): void {
  chrome.storage.sync.get(['selectedMode'], (data: any) => {
    callback(data.selectedMode as string);
  });
}
