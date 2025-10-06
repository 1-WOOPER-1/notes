import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Tooltip.module.scss";

export function Tooltip({ children, text }) {
  const [hovered, setHovered] = useState(false);
  const [startAnimation, setStartAnimation] = useState(false);
  const wrapperRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    let show;
    if (hovered && wrapperRef.current) {
      show = setTimeout(() => {
        const rect = wrapperRef.current.getBoundingClientRect();
        setCoords({ top: rect.bottom + 8, left: rect.left + rect.width / 2 });
        setStartAnimation(true);
      }, 400);
    } else {
      setStartAnimation(false);
    }
    return () => clearTimeout(show);
  }, [hovered]);

  return (
    <div
      ref={wrapperRef}
      className={styles.tooltip}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={() => setHovered(false)}
    >
      {children}
      <AnimatePresence>
        {startAnimation && text && (
          <motion.div
            className={styles.tooltipText}
            animate={{ opacity: startAnimation ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              top: coords.top,
              left: coords.left,
            }}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
