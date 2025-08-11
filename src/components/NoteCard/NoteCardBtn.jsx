import styles from "./NoteCardBtn.module.scss";

export function NoteCardBtn({ children, note, onClick }) {
  return (
    <button className={styles.toolbarBtn} onClick={() => onClick(note)}>
      {children}
    </button>
  );
}
