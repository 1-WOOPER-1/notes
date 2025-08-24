import { useEffect } from "react";

export function useClickOutside(targetRef, triggerRef = null, callback) {
  useEffect(() => {
    function handleClick(event) {
      const isTarget =
        targetRef.current && !targetRef.current.contains(event.target);
      const isTrigger =
        triggerRef?.current && !triggerRef?.current.contains(event.target);
      if (isTarget && (triggerRef ? isTrigger : true)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [targetRef, triggerRef, callback]);
}
