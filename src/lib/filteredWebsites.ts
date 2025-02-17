export const FILTERED_WEBSITES = ['facebook', 'linkedin', 'youtube', 'news', 'adult'] as const;

export type FilteredWebsite = (typeof FILTERED_WEBSITES)[number];

export type SettingsFilteredWebsites = Record<FilteredWebsite, boolean>;

export const DEFAULT_SETTINGS_FILTERED_WEBSITES: SettingsFilteredWebsites = {
  facebook: true,
  linkedin: true,
  youtube: true,
  news: true,
  adult: true,
};
