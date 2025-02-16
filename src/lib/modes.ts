export const MODES = ['create', 'analytics', 'play', 'inspiration', 'networking'] as const;

export type Mode = typeof MODES[number];

export type SettingsModes = Record<Mode, boolean>;

export const DEFAULT_SETTINGS_MODES: SettingsModes = {
  create: true,
  analytics: false,
  play: false,
  inspiration: false,
  networking: false,
};
