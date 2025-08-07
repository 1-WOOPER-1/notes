import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import styles from "./SearchInput.module.css";

export function SearchInput() {
  const [focused, setIsFocused] = useState(false);

  return (
    <div className={styles.inputWrapper}>
      <FaMagnifyingGlass />
      <input
        className={
          focused
            ? `${styles.searchInput} ${styles.stretch}`
            : styles.searchInput
        }
        type="text"
        placeholder="Search"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      ></input>
    </div>
  );
}
