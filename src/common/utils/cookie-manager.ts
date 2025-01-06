import Cookies from "js-cookie";
import { UserModel } from "@/types/auth";

export async function getCookie(key: string): Promise<string | undefined> {
  return Cookies.get(key);
}

export async function setCookie(key: string, value: string) {
  Cookies.set(key, value);
}

export async function deleteCookie(key: string) {
  Cookies.remove(key);
}

export const getUserLocalStorage = async (): Promise<UserModel | null> => {
  const user = await getCookie("user");
  if (user) return JSON.parse(user);
  return null;
};

export const setUserLocalStorage = (value: UserModel) => {
  setCookie("user", JSON.stringify(value));
};

export const removeUserLocalStorage = () => deleteCookie("user");
