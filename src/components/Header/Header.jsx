import { useState, useRef, useEffect } from "react";
import { PiGearFineBold } from "react-icons/pi";
import { FaMoon, FaSun } from "react-icons/fa6";
import { TbLayoutList, TbLayoutGrid } from "react-icons/tb";
import styles from "./Header.module.scss";
import { SearchInput } from "./SearchInput/SearchInput.jsx";
import { Button } from "@components/Button/Button.jsx";
import { DefaultUserIcon } from "@/icons/DefaultUserIcon.jsx";
import { DropDown } from "@components/DropDown/DropDown.jsx";
import { UserModal } from "@components/UserModal/UserModal.jsx";
import { useTheme } from "@/hooks/useTheme.js";
import { LocalStorageService } from "@/utils/localStorage.js";
import { useClickOutside } from "@/hooks/useClickOutside.js";

export function Header({ setQuery, listView, setlistView }) {
  const { theme, toggleTheme } = useTheme();

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dropDownRef = useRef(null);
  const settingsBtnRef = useRef(null);
  const userModalRef = useRef(null);
  const userModalBtnRef = useRef(null);

  useClickOutside(dropDownRef, settingsBtnRef, toggleDropDown);
  useClickOutside(userModalRef, userModalBtnRef, toggleModal);

  function toggleView() {
    setlistView((prev) => {
      const newListView = !prev;
      LocalStorageService.setItem("listView", newListView);
      return newListView;
    });
  }

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
          <Button className={styles.headerBtn} onClick={toggleView}>
            {!listView ? <TbLayoutList /> : <TbLayoutGrid />}
          </Button>
          <div ref={settingsBtnRef}>
            <Button
              className={`${styles.headerBtn} ${styles.settingsBtn}`}
              onClick={toggleDropDown}
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
            <Button className={styles.userModalBtn} onClick={toggleModal}>
              <DefaultUserIcon style={{ fontSize: "1.8rem" }} />
            </Button>
            {isModalOpen && (
              <div ref={userModalRef}>
                <UserModal ref={userModalRef} toggleModal={toggleModal} />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
