import styles from "./DropDown.module.scss";

export function DropDown({ children }, ref) {
  return (
    <ul className={styles.dropDown} ref={ref}>
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
