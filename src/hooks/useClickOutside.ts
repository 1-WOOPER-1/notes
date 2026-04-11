import { RefObject, useEffect } from "react";

export function useClickOutside<T extends HTMLElement, U extends HTMLElement>(
  targetRef: RefObject<T | null>,
  triggerRef: RefObject<U | null> | null = null,
  callback: () => void,
) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as Node;
      const isOutsideTarget =
        targetRef.current && !targetRef.current.contains(target);
      const isOutsideTrigger = triggerRef?.current
        ? !triggerRef?.current.contains(target)
        : true;
      if (isOutsideTarget && isOutsideTrigger) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [targetRef, triggerRef, callback]);
}
