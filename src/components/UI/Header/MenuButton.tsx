import { useRef, useState } from "react";
import { TbEqual } from "react-icons/tb";
import { FaMoon, FaSun } from "react-icons/fa6";
import { AnimatePresence, motion } from "motion/react";
import styles from "./Header.module.scss";
import { DropDown } from "@/components/DropDown/DropDown";
import { Button } from "@components/UI/Button/Button";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useTheme } from "@/context/ThemeContext";
import { TfiClose } from "react-icons/tfi";

export function MenuButton() {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  useClickOutside(dropDownRef, btnRef, toggleDropDown);

  const items = [
    <button onClick={toggleTheme}>
      {theme === "light" ? <FaMoon /> : <FaSun />}
      <span className={styles.text}>
        {theme === "light" ? "Night Mode" : "Day Mode"}
      </span>
    </button>,
  ];

  function toggleDropDown() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div ref={btnRef} className={styles.menuBtnWrapper}>
      <Button
        className={`${styles.headerBtn} ${styles.menuBtn} ${isOpen ? styles.open : ""}`}
        onClick={toggleDropDown}
        toolTipText="Settings"
      >
        {isOpen ? (
          <TfiClose style={{ transform: "scale(0.7)" }} />
        ) : (
          <TbEqual strokeWidth={1} style={{ transform: "scaleX(1.7)" }} />
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropDownRef}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <DropDown>{items}</DropDown>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
