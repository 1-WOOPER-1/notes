import styles from "./Header.module.scss";
import { SearchInput } from "./SearchInput/SearchInput";
import { UserModalButton } from "@/components/UserModal/UserModalButton";
import { SettingsButton } from "./SettingsButton";
import { ToggleViewButton } from "./ToggleViewButton";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <h1 className={styles.logo}>NOTES</h1>
        <div className={styles.headerSecondary}>
          <SearchInput />
          <ToggleViewButton />
          <SettingsButton />
          <UserModalButton />
        </div>
      </div>
    </header>
  );
}
