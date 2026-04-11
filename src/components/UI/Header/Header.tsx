import { useState, useRef } from "react";
import { PiGearFineBold } from "react-icons/pi";
import { FaMoon, FaSun } from "react-icons/fa6";
import { TbLayoutList, TbLayoutGrid } from "react-icons/tb";
import styles from "./Header.module.scss";
import { SearchInput } from "./SearchInput/SearchInput";
import { Button } from "@components/UI/Button/Button";
import { DefaultUserIcon } from "@/icons/DefaultUserIcon";
import { DropDown } from "@components/DropDown/DropDown";
import { UserModal } from "@components/UserModal/UserModal";
import { useTheme } from "@/context/ThemeContext";
import { useUI } from "@/context/UIContext";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Tooltip } from "@components/UI/Tooltip/Tooltip";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { setQuery, listView, toggleView } = useUI();

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dropDownRef = useRef<HTMLDivElement>(null);
  const settingsBtnRef = useRef<HTMLDivElement>(null);
  const userModalRef = useRef<HTMLDivElement>(null);
  const userModalBtnRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropDownRef, settingsBtnRef, toggleDropDown);
  useClickOutside(userModalRef, userModalBtnRef, toggleModal);

  function toggleDropDown() {
    setIsDropDownOpen((prev) => !prev);
  }

  function toggleModal() {
    setIsModalOpen((prev) => !prev);
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <h1 className={styles.logo}>NOTES</h1>
        <div className={styles.headerSecondary}>
          <SearchInput setQuery={setQuery} />
          <Tooltip text={listView ? "Grid view" : "List view"}>
            <Button className={styles.headerBtn} onClick={toggleView}>
              {!listView ? <TbLayoutList /> : <TbLayoutGrid />}
            </Button>
          </Tooltip>
          <div ref={settingsBtnRef}>
            <Button
              className={`${styles.headerBtn} ${styles.settingsBtn}`}
              onClick={toggleDropDown}
              toolTipText="Settings"
            >
              <PiGearFineBold />
            </Button>
            {isDropDownOpen && (
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
          <div ref={userModalBtnRef}>
            <Button
              className={styles.userModalBtn}
              onClick={toggleModal}
              toolTipText="Account"
            >
              <DefaultUserIcon style={{ fontSize: "1.8rem" }} />
            </Button>
            {isModalOpen && (
              <div ref={userModalRef}>
                <UserModal toggleModal={toggleModal} />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
