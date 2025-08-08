import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineUnarchive } from "react-icons/md";
import { RiPushpin2Fill, RiPushpin2Line } from "react-icons/ri";
import styles from "./NoteCardToolbar.module.css";

export function NoteCardToolbar() {
  return (
    <div className={styles.noteCardToolbar}>
      <FaRegTrashAlt />
      <MdOutlineUnarchive style={{ fontSize: "1.3rem" }} />
      <RiPushpin2Fill style={{ fontSize: "1.3rem" }} />
      <RiPushpin2Line style={{ fontSize: "1.3rem" }} />
    </div>
  );
}
