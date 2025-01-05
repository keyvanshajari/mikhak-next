import { useState, useEffect } from "react";
import { MobileDeviceRegex } from "../constants/constants";

export const useDeviceType = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const userAgent = typeof window !== "undefined" ? navigator.userAgent : "";
    setIsMobile(MobileDeviceRegex.test(userAgent));
  }, []);

  return isMobile;
};

export const useIsMobileSize = (): boolean | null => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
};
