export const FILTERED_WEBSITES: string[] = [
  'facebook',
  'linkedin',
  'youtube',
  'github',
  'news',
  'adult',
] as const;

export type FilteredWebsite = (typeof FILTERED_WEBSITES)[number];

export type SettingsFilteredWebsites = Record<FilteredWebsite, boolean>;

export const DEFAULT_SETTINGS_FILTERED_WEBSITES: SettingsFilteredWebsites = {
  facebook: true,
  linkedin: true,
  youtube: true,
  github: true,
  news: true,
  adult: true,
};
