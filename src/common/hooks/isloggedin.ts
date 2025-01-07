import { useEffect, useState } from "react";
import { getUserLocal } from "../utils/cookie-manager";

export const useIsLoggedIn = (): boolean | null => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserLocal();
      setIsLoggedIn(user != null);
    };
    getUser();
  }, []);

  return isLoggedIn;
};
