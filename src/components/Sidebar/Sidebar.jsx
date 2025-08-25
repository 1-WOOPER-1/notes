import { FaRegNoteSticky } from "react-icons/fa6";
import { MdOutlineArchive } from "react-icons/md";
import { PiTrashBold } from "react-icons/pi";
import styles from "./Sidebar.module.scss";

export function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <button className={`${styles.sidebarItem} ${styles.active}`}>
        <FaRegNoteSticky className={styles.icon} /> <span>Notes</span>
      </button>
      <button className={styles.sidebarItem}>
        <MdOutlineArchive className={styles.icon} /> <span>Archive</span>
      </button>
      <button className={styles.sidebarItem}>
        <PiTrashBold className={styles.icon} /> <span>Bin</span>
      </button>
    </div>
  );
}
