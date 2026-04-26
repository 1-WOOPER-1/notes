import { useRef, useState } from "react";
import { TbEqual } from "react-icons/tb";
import { FaMoon, FaSun } from "react-icons/fa6";
import { AnimatePresence, motion } from "motion/react";
import styles from "./MenuButton.module.scss";
import { DropDown } from "@/components/DropDown/DropDown";
import { Button } from "@components/UI/Button/Button";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useTheme } from "@/context/ThemeContext";
import { TfiClose } from "react-icons/tfi";
import { ToggleViewButton } from "../ToggleViewButton";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { UserModalButton } from "@/components/UserModal/UserModalButton";

export function MenuButton() {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  useClickOutside(dropDownRef, btnRef, toggleDropDown);
  const isTablet = useMediaQuery("(max-width: 768px)");
  const isMobile = useMediaQuery("(max-width: 460px)");

  const items = [
    <Button onClick={toggleTheme} className={styles.menuListBtn}>
      {theme === "light" ? <FaMoon /> : <FaSun />}
      <span className={styles.text}>
        {theme === "light" ? "Night Mode" : "Day Mode"}
      </span>
    </Button>,
  ];

  if (isTablet) {
    if (!isMobile) {
      items.push(
        <ToggleViewButton showLabel={true} className={styles.menuListBtn} />,
      );
    }
    items.push(
      <UserModalButton showLabel={true} className={styles.menuListBtn} />,
    );
  }

  function toggleDropDown() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div ref={btnRef} className={styles.menuBtnWrapper}>
      <Button
        className={`${styles.headerBtn} ${styles.menuBtn} ${isOpen ? styles["menuBtn--open"] : ""}`}
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
