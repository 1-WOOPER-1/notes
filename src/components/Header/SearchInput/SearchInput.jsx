import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import styles from "./SearchInput.module.scss";

export function SearchInput({ setQuery }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setQuery(value);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value, setQuery]);

  return (
    <div className={styles.inputWrapper}>
      <FaMagnifyingGlass />
      <input
        className={focused ? styles.stretch : ""}
        type="text"
        placeholder="Search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      ></input>
    </div>
  );
}
