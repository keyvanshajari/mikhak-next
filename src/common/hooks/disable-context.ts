import { useEffect } from "react";
import { isProd } from "../config/config";

export const useDisableContextMenu = (): void => {
  useEffect(() => {
    if (isProd) {
      const disableDevTools = (event: KeyboardEvent) => {
        if (event.key === "F12" || (event.ctrlKey && event.shiftKey && event.key === "I")) {
          event.preventDefault();
        }
      };
      document.addEventListener("keydown", disableDevTools);

      const disableContextMenu = (event: MouseEvent) => {
        event.preventDefault();
      };
      document.addEventListener("contextmenu", disableContextMenu);

      return () => {
        document.removeEventListener("keydown", disableDevTools);
        document.removeEventListener("contextmenu", disableContextMenu);
      };
    }
  }, []);
};
