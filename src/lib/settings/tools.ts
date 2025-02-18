export const TOOLS: string[] = ['grayscale', 'grayscalePercentage'] as const;

export type Tool = (typeof TOOLS)[number];

export type SettingsTools = Record<Tool, boolean | number>;

export const DEFAULT_SETTINGS_TOOLS: SettingsTools = {
  grayscale: false,
  grayscalePercentage: 100,
};
