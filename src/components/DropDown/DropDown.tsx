import { forwardRef } from "react";
import styles from "./DropDown.module.scss";

interface DropDownProps {
  children: React.ReactNode;
}

export const DropDown = forwardRef<HTMLUListElement, DropDownProps>(
  ({ children }: DropDownProps, ref) => {
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
  },
);
