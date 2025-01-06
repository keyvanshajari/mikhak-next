import { APP_TYPE } from "../constants/constants";

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
export const setLocalStorageData = (key: string, value: any) => localStorage.setItem(key, value);
export const removeLocalStorageData = (key: string) => localStorage.removeItem(key);

export const setAppType = (type: number) => setLocalStorageData("app_type", `${type}`);
export const getAppType = (): number =>
  parseInt(getLocalStorageData("app_type") ?? `${APP_TYPE.moda}`);
