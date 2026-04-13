import styles from "./DropDown.module.scss";

interface DropDownProps {
  children: React.ReactNode;
}

export function DropDown({ children }: DropDownProps) {
  return (
    <ul className={styles.dropDown}>
      {Array.isArray(children) ? (
        children.map((item, index) => (
          <li className={styles.dropDownItem} key={index}>
            {item}
          </li>
        ))
      ) : (
        <li className={styles.dropDownItem}>{children}</li>
      )}
    </ul>
  );
}
