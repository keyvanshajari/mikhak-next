import { useEffect, useState } from "react";
import { APP_TYPE } from "../constants/constants";
import { getAppType } from "../utils/cookie-manager";

export const useAppType = (): number | null => {
  const [appType, setAppType] = useState(APP_TYPE.moda);

  useEffect(() => {
    const loadAppType = async () => {
      const appType = await getAppType();
      setAppType(appType);
    };
    loadAppType();
  }, []);

  return appType;
};
