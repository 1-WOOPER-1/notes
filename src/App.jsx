import styles from "./App.module.css";
import { SearchInput } from "./components/SearchInput.jsx";
import { SettingsBtn } from "./components/SettingsBtn/SettingsBtn.jsx";

export function App() {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <h1 className={styles.logo}>NOTES</h1>
          <div className={styles.headerSecondary}>
            <SearchInput />
            <SettingsBtn />
          </div>
        </div>
      </header>
      <main className={styles.main}></main>
    </div>
  );
}
