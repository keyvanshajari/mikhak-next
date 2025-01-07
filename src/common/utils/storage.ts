export const getLocalStorageData = (key: string): string | null => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem(key);
    }
    return null;
  } catch (error) {
    throw error;
  }
};
export const setLocalStorageData = (key: string, value: string) => localStorage.setItem(key, value);
export const removeLocalStorageData = (key: string) => localStorage.removeItem(key);
