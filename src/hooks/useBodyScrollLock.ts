import { useEffect } from "react";

export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    console.log("scroll lock", isLocked);
    if (isLocked) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "";
    }
    return () => {
      window.document.body.style.overflow = "";
    };
  }, [isLocked]);
}
