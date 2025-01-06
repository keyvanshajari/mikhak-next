import { useEffect, useState } from "react";
import { APP_TYPE } from "../constants/constants";
import { getAppType } from "../utils/storage";

export const useAppType = (): number | null => {
  const [appType, setAppType] = useState(APP_TYPE.moda);

  useEffect(() => {
    setAppType(getAppType());
  }, []);

  return appType;
};
