import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { DEFAULT_SETTINGS_MODES, Mode, MODES, SettingsModes } from '../lib/modes';
import { t } from '../lib/i18n';
import {
  DEFAULT_SETTINGS_FILTERED_WEBSITES,
  SettingsFilteredWebsites,
} from '../lib/filteredWebsites';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube';

const Settings: React.FC = () => {
  const [settingsModes, setSettingsModes] = useState<SettingsModes>(DEFAULT_SETTINGS_MODES);
  const [settingsFilteredWebsites, setSettingsFilteredWebsites] =
    useState<SettingsFilteredWebsites>(DEFAULT_SETTINGS_FILTERED_WEBSITES);

  useEffect(() => {
    chrome.storage.sync.get(['modeSettings'], (result: any) => {
      const data = result.modeSettings as SettingsModes | undefined;
      if (data) {
        setSettingsModes(data);
      } else {
        chrome.storage.sync.set({ modeSettings: DEFAULT_SETTINGS_MODES });
      }
    });

    chrome.storage.sync.get(['filteredWebsitesSettings'], (result: any) => {
      const data = result.filteredWebsitesSettings as SettingsFilteredWebsites | undefined;
      if (data) {
        setSettingsFilteredWebsites(data);
      } else {
        chrome.storage.sync.set({ filteredWebsitesSettings: DEFAULT_SETTINGS_FILTERED_WEBSITES });
      }
    });
  }, []);

  const handleToggleModes = (mode: Mode) => {
    const updatedSettings: SettingsModes = {
      ...settingsModes,
      [mode]: !settingsModes[mode],
    };
    setSettingsModes(updatedSettings);
    chrome.storage.sync.set({ modeSettings: updatedSettings });
  };

  const handleToggleFilteredWebsites = (filteredWebsite: string) => {
    const updatedSettings: SettingsFilteredWebsites = {
      ...settingsFilteredWebsites,
      [filteredWebsite]: !settingsFilteredWebsites[filteredWebsite],
    };
    setSettingsFilteredWebsites(updatedSettings);
    chrome.storage.sync.set({ filteredWebsitesSettings: updatedSettings });
  };

  return (
    <>
      <div className="menu">
        <div className="menu-item">{t('settingsAbout')}</div>
        <a href="mailto:ceo+focusmode@cothema.com" target="_blank" rel="noopener noreferrer">
          <div className="cursor-pointer p-2 hover:bg-gray-700" id="report">
            {t('reportIssue')}
          </div>
        </a>
      </div>

      <div className="content">
        <div className="content-text">
          <p>{t('settingsDescription')}</p>

          <h2>{t('settingsSupportedWebsites')}</h2>
          <ul style={{ listStyleType: 'none' }}>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={settingsFilteredWebsites.linkedin}
                  onChange={() => handleToggleFilteredWebsites('linkedin')}
                />
                <FontAwesomeIcon icon={faLinkedinIn} className={'me-2'} />
                LinkedIn
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={settingsFilteredWebsites.facebook}
                  onChange={() => handleToggleFilteredWebsites('facebook')}
                />
                <FontAwesomeIcon icon={faFacebookSquare} className={'me-2'} />
                Facebook
              </label>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={settingsFilteredWebsites.youtube}
                  onChange={() => handleToggleFilteredWebsites('youtube')}
                />
                <FontAwesomeIcon icon={faYoutube} className={'me-2'} />
                YouTube
              </label>
            </li>
          </ul>

          <h2>Content Filtering</h2>
          <label>
            <input
              type="checkbox"
              checked={settingsFilteredWebsites.news}
              onChange={() => handleToggleFilteredWebsites('news')}
            />
            Block News Sites
          </label>
          <label>
            <input
              type="checkbox"
              checked={settingsFilteredWebsites.adult}
              onChange={() => handleToggleFilteredWebsites('adult')}
            />
            Block Adult Sites
          </label>

          <h2>{t('settingsEnabledModes')}</h2>
          {MODES.map((mode) => (
            <div key={mode}>
              <label>
                <input
                  type="checkbox"
                  checked={settingsModes[mode]}
                  onChange={() => handleToggleModes(mode)}
                />
                {t(`mode${mode.charAt(0).toUpperCase() + mode.slice(1)}`)}
              </label>
            </div>
          ))}
        </div>

        <footer>
          <p>
            {t('settingsLicense')}
            <br />
            {t('settingsSourceCode')}{' '}
            <a
              href="https://github.com/cothema/minimalist-focus-mode/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </p>
          <p>
            {t('settingsCreatedBy')}{' '}
            <a href="https://cothema.com/" target="_blank" rel="noopener noreferrer">
              Cothema s.r.o.
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};

const container = document.getElementById('settings-root');
if (container) {
  createRoot(container).render(<Settings />);
}
