import { useEffect, useState } from "react";
import { getUserLocalStorage } from "../utils/storage";

export const useIsLoggedIn = (): boolean | null => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const user = getUserLocalStorage();
    setIsLoggedIn(user != null);
  }, []);

  return isLoggedIn;
};
