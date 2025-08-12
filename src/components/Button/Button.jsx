import styles from "./Button.module.scss";

export function Button({ children, className, note, onClick }) {
  return (
    <button
      className={`${styles.button} ${className || ""}`}
      onClick={(event) => {
        event.stopPropagation();
        onClick(note);
      }}
    >
      {children}
    </button>
  );
}
