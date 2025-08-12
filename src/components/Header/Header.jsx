import { PiGearFineBold } from "react-icons/pi";
import styles from "./Header.module.scss";
import { SearchInput } from "../SearchInput/SearchInput.jsx";
import { Button } from "../Button/Button.jsx";

export function Header({ setQuery }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <h1 className={styles.logo}>NOTES</h1>
        <div className={styles.headerSecondary}>
          <SearchInput setQuery={setQuery} />
          <Button className={styles.settingsBtn}>
            <PiGearFineBold />
          </Button>
        </div>
      </div>
    </header>
  );
}
