import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineUnarchive } from "react-icons/md";
import { RiPushpin2Fill, RiPushpin2Line } from "react-icons/ri";
import { Button } from "../Button/Button.jsx";
import styles from "./NoteCard.module.scss";

export function NoteCard({ note, openNote, pinNote, deleteNote }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: note.id });

  const [isDeleting, setIsDeleting] = useState(false);

  function handleDelete() {
    setIsDeleting(true);
    setTimeout(() => {
      deleteNote(note);
    }, 300);
  }

  return (
    <div
      className={`${styles.noteCard} ${isDeleting ? styles.deleting : ""}`}
      onClick={() => openNote(note)}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: "pointer",
      }}
    >
      <h2>{note.title}</h2>
      <p>{note.body}</p>
      <div className={styles.noteCardToolbar}>
        <Button note={note} onClick={handleDelete} className={styles.deleteBtn}>
          <FaRegTrashAlt style={{ fontSize: "1rem" }} />
        </Button>
        <Button>
          <MdOutlineUnarchive />
        </Button>
        <Button note={note} onClick={pinNote}>
          {note.isPinned ? <RiPushpin2Fill /> : <RiPushpin2Line />}
        </Button>
      </div>
    </div>
  );
}
