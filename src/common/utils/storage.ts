import { UserModel } from "@/types/auth";
import { APP_TYPE } from "../constants/constants";

//LocalStorage
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

export const setAppType = (type: number) => setLocalStorageData("app_type", `${type}`);
export const getAppType = (): number =>
  parseInt(getLocalStorageData("app_type") ?? `${APP_TYPE.moda}`);

//User storage
export const getUserLocalStorage = (): UserModel | null => {
  const user = getLocalStorageData("user");
  if (user) return JSON.parse(user);

  return null;
};
export const setUserLocalStorage = (value: UserModel) => {
  console.log(value);

  setLocalStorageData("user", JSON.stringify(value));
};
export const removeUserLocalStorage = () => localStorage.removeItem("user");
