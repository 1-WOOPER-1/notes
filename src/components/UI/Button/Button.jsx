import styles from "./Button.module.scss";
import { Tooltip } from "@components/UI/Tooltip/Tooltip.jsx";

export function Button({ children, className, onClick, toolTipText }) {
  return (
    <Tooltip text={toolTipText}>
      <button
        className={`${styles.button} ${className || ""}`}
        onClick={(event) => {
          event.stopPropagation();
          onClick();
        }}
      >
        {children}
      </button>
    </Tooltip>
  );
}
