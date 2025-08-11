import styles from "./Header.module.scss";
import { SearchInput } from "../SearchInput/SearchInput.jsx";
import { SettingsBtn } from "../SettingsBtn/SettingsBtn.jsx";

export function Header({ setQuery }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <h1 className={styles.logo}>NOTES</h1>
        <div className={styles.headerSecondary}>
          <SearchInput setQuery={setQuery} />
          <SettingsBtn />
        </div>
      </div>
    </header>
  );
}
