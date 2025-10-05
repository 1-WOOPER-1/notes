import styles from "./Button.module.scss";

export function Button({ children, className, onClick }) {
  return (
    <button
      className={`${styles.button} ${className || ""}`}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
    >
      {children}
    </button>
  );
}
