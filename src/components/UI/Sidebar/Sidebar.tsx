import { useCallback } from "react";
import { NavLink } from "react-router-dom";
import { FaRegNoteSticky } from "react-icons/fa6";
import { MdOutlineArchive } from "react-icons/md";
import { PiTrashBold, PiNotePencil } from "react-icons/pi";
import { useNotesStore } from "@/stores/useNotesStore";
import styles from "./Sidebar.module.scss";
import { useUIStore } from "@/stores/useUIStore";

export function Sidebar() {
  const sidebarItems = [
    { to: "/main", icon: FaRegNoteSticky, label: "Notes" },
    { to: "/archive", icon: MdOutlineArchive, label: "Archive" },
    { to: "/bin", icon: PiTrashBold, label: "Bin" },
  ];

  const createNewNote = useNotesStore((state) => state.createNewNote);
  const setPendingOpenNoteId = useUIStore(
    (state) => state.setPendingOpenNoteId,
  );

  const handleCreateNewNote = useCallback(() => {
    const newNote = createNewNote();
    setPendingOpenNoteId(newNote.id);
  }, [createNewNote, setPendingOpenNoteId]);

  return (
    <div className={styles.sidebar}>
      <button className={styles.newNoteBtn} onClick={handleCreateNewNote}>
        <div className={styles.icon}>
          <PiNotePencil />
        </div>
        <span>New note</span>
      </button>
      {sidebarItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `${styles.sidebarItem} ${isActive ? styles.active : ""}`
          }
        >
          <Icon className={styles.icon} />{" "}
          <span className={styles.text}>{label}</span>
        </NavLink>
      ))}
    </div>
  );
}
