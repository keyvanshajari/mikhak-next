import Cookies from "js-cookie";
import { UserModel } from "@/types/auth";
import { APP_TYPE } from "../constants/constants";

export async function getCookie(key: string): Promise<string | undefined> {
  const res = await Cookies.get(key);
  return res;
}

export async function setCookie(key: string, value: string) {
  await Cookies.set(key, value);
}

export async function deleteCookie(key: string) {
  await Cookies.remove(key);
}

export const USER_COOKIE_NAME = "user";
export const getUserLocal = async (): Promise<UserModel | null> => {
  const user = await getCookie(USER_COOKIE_NAME);
  if (user) return JSON.parse(user);
  return null;
};

export const setUserLocal = (value: UserModel) => {
  setCookie(USER_COOKIE_NAME, JSON.stringify(value));
};

export const removeUserLocal = () => deleteCookie(USER_COOKIE_NAME);

export const APPTYPE_COOKIE_NAME = "appType";

export const setAppType = async (type: number) => await setCookie(APPTYPE_COOKIE_NAME, `${type}`);
export const getAppType = async (): Promise<number> => {
  const apptype = await getCookie(APPTYPE_COOKIE_NAME);
  return parseInt(apptype ?? `${APP_TYPE.moda}`);
};
