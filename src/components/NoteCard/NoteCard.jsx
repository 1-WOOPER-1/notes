import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineUnarchive } from "react-icons/md";
import { RiPushpin2Fill, RiPushpin2Line } from "react-icons/ri";
import { NoteCardBtn } from "./NoteCardBtn.jsx";
import styles from "./NoteCard.module.scss";

export function NoteCard({ note, pinNote, deleteNote }) {
  return (
    <div className={styles.noteCard}>
      <h2>{note.title}</h2>
      <p>{note.body}</p>
      <div className={styles.noteCardToolbar}>
        <NoteCardBtn note={note} onClick={deleteNote}>
          <FaRegTrashAlt style={{ fontSize: "1rem" }} />
        </NoteCardBtn>
        <NoteCardBtn>
          <MdOutlineUnarchive />
        </NoteCardBtn>
        <NoteCardBtn note={note} onClick={pinNote}>
          {note.isPinned ? <RiPushpin2Fill /> : <RiPushpin2Line />}
        </NoteCardBtn>
      </div>
    </div>
  );
}
