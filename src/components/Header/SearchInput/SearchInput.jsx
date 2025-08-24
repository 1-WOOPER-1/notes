import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import styles from "./SearchInput.module.scss";
import { useDebounce } from "@/hooks/useDebounce";

export function SearchInput({ setQuery }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    setQuery(debouncedValue);
  }, [debouncedValue, setQuery]);

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
