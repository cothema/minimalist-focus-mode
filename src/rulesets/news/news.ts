import { SettingsFilteredWebsites } from '../../lib/filteredWebsites';

function blockNewsPages() {
  chrome.storage.sync.get(['selectedMode'], (data: any) => {
    const selectedMode = data.selectedMode;
    if (['create', 'networking', 'analytics', 'play'].includes(selectedMode)) {
      document.body.innerHTML =
        '<h1>Blocked</h1><p>This page is blocked to help you stay focused.</p><p>Change your mode in the extension Minimalist Focus Mode to access this page.</p>';
      document.body.style.cssText = `
        background: #222222;
        color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        font-family: Arial, sans-serif;
        font-size: 24px;
        text-align: center;
      `;
    }
  });
}

chrome.storage.sync.get(['filteredWebsitesSettings'], (result: any) => {
  const data = result.filteredWebsitesSettings as SettingsFilteredWebsites | undefined;
  if (data?.news) {
    blockNewsPages();
  }
});
