import { Link } from "react-router-dom";
import { FaRegNoteSticky } from "react-icons/fa6";
import { MdOutlineArchive } from "react-icons/md";
import { PiTrashBold } from "react-icons/pi";
import styles from "./Sidebar.module.scss";

export function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Link to="/notes" className={`${styles.sidebarItem} ${styles.active}`}>
        <FaRegNoteSticky className={styles.icon} /> <span>Notes</span>
      </Link>
      <Link to="/archive" className={styles.sidebarItem}>
        <MdOutlineArchive className={styles.icon} /> <span>Archive</span>
      </Link>
      <Link to="/bin" className={styles.sidebarItem}>
        <PiTrashBold className={styles.icon} /> <span>Bin</span>
      </Link>
    </div>
  );
}
