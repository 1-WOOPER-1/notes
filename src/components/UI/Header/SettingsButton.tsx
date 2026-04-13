import { useRef, useState } from "react";
import { PiGearFineBold } from "react-icons/pi";
import { FaMoon, FaSun } from "react-icons/fa6";
import styles from "./Header.module.scss";
import { DropDown } from "@/components/DropDown/DropDown";
import { Button } from "@components/UI/Button/Button";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useTheme } from "@/context/ThemeContext";

export function SettingsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  useClickOutside(dropDownRef, btnRef, toggleDropDown);

  function toggleDropDown() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div ref={btnRef}>
      <Button
        className={`${styles.headerBtn} ${styles.settingsBtn}`}
        onClick={toggleDropDown}
        toolTipText="Settings"
      >
        <PiGearFineBold />
      </Button>
      {isOpen && (
        <div ref={dropDownRef}>
          <DropDown>
            <button onClick={toggleTheme}>
              {theme === "light" ? <FaMoon /> : <FaSun />}
              <span>{theme === "light" ? "Night Mode" : "Day Mode"}</span>
            </button>
          </DropDown>
        </div>
      )}
    </div>
  );
}
