import { useContext, useState, useRef, useEffect } from "react";
import { PiGearFineBold } from "react-icons/pi";
import { FaMoon, FaSun } from "react-icons/fa6";
import { TbLayoutList, TbLayoutGrid } from "react-icons/tb";
import styles from "./Header.module.scss";
import { SearchInput } from "./SearchInput/SearchInput.jsx";
import { Button } from "../Button/Button.jsx";
import { DefaultUserIcon } from "../../icons/DefaultUserIcon.jsx";
import { DropDown } from "../DropDown/DropDown.jsx";
import { ThemeContext } from "../../context/ThemeContext.js";

export function Header({ setQuery, toggleModal, listView, setlistView }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const dropDownRef = useRef(null);
  const settingsBtnRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropDownRef &&
        !dropDownRef.current.contains(event.target) &&
        !settingsBtnRef.current.contains(event.target)
      ) {
        setIsDropDownOpen(false);
      }
    }

    if (isDropDownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropDownOpen, setIsDropDownOpen]);

  function toggleView() {
    setlistView((prev) => !prev);
  }

  function toggleDropDown() {
    setIsDropDownOpen((prev) => !prev);
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
          <Button className={styles.userModalBtn} onClick={() => toggleModal()}>
            <DefaultUserIcon style={{ fontSize: "1.8rem" }} />
          </Button>
        </div>
      </div>
    </header>
  );
}
