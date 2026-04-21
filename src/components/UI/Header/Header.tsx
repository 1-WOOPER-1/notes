import styles from "./Header.module.scss";
import { SearchInput } from "./SearchInput/SearchInput";
import { UserModalButton } from "@/components/UserModal/UserModalButton";
import { MenuButton } from "./MenuButton";
import { ToggleViewButton } from "./ToggleViewButton";
import { useScrolled } from "@/hooks/useScrolled";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function Header() {
  const scrolled = useScrolled();
  const isTablet = useMediaQuery("(max-width: 768px)");

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.headerContainer}>
        <h1 className={styles.logo}>NOTES</h1>
        <div className={styles.headerSecondary}>
          <SearchInput />
          {!isTablet && <ToggleViewButton className={styles.headerBtn} />}
          <MenuButton />
          {!isTablet && <UserModalButton className={styles.userModalBtn} />}
        </div>
      </div>
    </header>
  );
}
