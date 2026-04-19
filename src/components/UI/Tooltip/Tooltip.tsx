import { useRef, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./Tooltip.module.scss";
import { createPortal } from "react-dom";

interface TooltipType {
  children: ReactNode;
  text?: string;
}

export function Tooltip({ children, text }: TooltipType) {
  const hoveredRef = useRef(false);
  const [tooltip, setTooltip] = useState<{ top: number; left: number } | null>(
    null,
  );
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | undefined>(undefined);

  function handleMouseEnter() {
    hoveredRef.current = true;
    timerRef.current = setTimeout(() => {
      if (!hoveredRef.current || !wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      setTooltip({
        top: rect.bottom + 8 + window.scrollY,
        left: rect.left + rect.width / 2 + window.scrollX,
      });
    }, 400);
  }

  function handleMouseLeave() {
    hoveredRef.current = false;
    clearTimeout(timerRef.current);
    setTooltip(null);
  }

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseLeave}
    >
      {children}
      {createPortal(
        <AnimatePresence>
          {tooltip && text && (
            <motion.div
              className={styles.tooltipText}
              animate={{ opacity: tooltip ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                top: tooltip.top,
                left: tooltip.left,
              }}
            >
              {text}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </div>
  );
}
