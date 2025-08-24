import { useRef, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CSSTransition } from "react-transition-group";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineUnarchive } from "react-icons/md";
import { RiPushpin2Fill, RiPushpin2Line } from "react-icons/ri";
import { Button } from "@components/Button/Button.jsx";
import styles from "./NoteCard.module.scss";
import { useNoteActions } from "@/hooks/useNoteActions";

export function NoteCard({ note }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: note.id });
  const { openNote, pinNote, deleteNote } = useNoteActions();

  const [isDeleting, setIsDeleting] = useState(false);
  const [hovered, setHovered] = useState(false);
  const toolbarRef = useRef(null);

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
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
      <CSSTransition
        nodeRef={toolbarRef}
        in={hovered}
        timeout={250}
        classNames={{
          enter: styles.noteCardToolbarEnter,
          enterActive: styles.noteCardToolbarEnterActive,
          enterDone: styles.noteCardToolbarEnterDone,
          exit: styles.noteCardToolbarExit,
          exitActive: styles.noteCardToolbarExitActive,
        }}
      >
        <div className={styles.noteCardToolbar} ref={toolbarRef}>
          <Button
            note={note}
            onClick={handleDelete}
            className={styles.deleteBtn}
          >
            <FaRegTrashAlt style={{ fontSize: "1rem" }} />
          </Button>
          <Button>
            <MdOutlineUnarchive />
          </Button>
          <Button note={note} onClick={pinNote}>
            {note.isPinned ? <RiPushpin2Fill /> : <RiPushpin2Line />}
          </Button>
        </div>
      </CSSTransition>
    </div>
  );
}
