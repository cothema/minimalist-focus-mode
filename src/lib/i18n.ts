export const t = (key: any) => {
  return chrome?.i18n?.getMessage(key) || key; // Fallback to key if message is missing
};
