import { NavLink } from "react-router-dom";
import { FaRegNoteSticky } from "react-icons/fa6";
import { MdOutlineArchive } from "react-icons/md";
import { PiTrashBold, PiNotePencil } from "react-icons/pi";
import styles from "./Sidebar.module.scss";

export function Sidebar() {
  const sidebarItems = [
    { to: "/notes", icon: FaRegNoteSticky, label: "Notes" },
    { to: "/archive", icon: MdOutlineArchive, label: "Archive" },
    { to: "/bin", icon: PiTrashBold, label: "Bin" },
  ];

  return (
    <div className={styles.sidebar}>
      <button className={styles.newNoteBtn}>
        <PiNotePencil className={styles.icon} /> <span>New note</span>
      </button>
      {sidebarItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `${styles.sidebarItem} ${isActive ? styles.active : ""}`
          }
        >
          <Icon className={styles.icon} /> <span>{label}</span>
        </NavLink>
      ))}
    </div>
  );
}
