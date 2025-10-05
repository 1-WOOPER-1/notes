import { motion } from "framer-motion";
import { PiTrashBold } from "react-icons/pi";
import { MdOutlineArchive } from "react-icons/md";
import { RiPushpin2Fill, RiPushpin2Line } from "react-icons/ri";
import { Button } from "@components/UI/Button/Button.jsx";
import { useNoteActions } from "@/hooks/useNoteActions";
import styles from "./NoteCard.module.scss";

export function Toolbar({ note, hovered, setIsDeleting }) {
  const { pinNote, deleteNote, archiveNote } = useNoteActions();

  function handleDelete() {
    setIsDeleting(true);
    setTimeout(() => {
      deleteNote(note);
    }, 300);
  }

  return (
    <motion.div
      className={styles.noteCardToolbar}
      animate={{ opacity: hovered ? 1 : 0 }}
      transition={{ duration: 0.25 }}
    >
      <Button note={note} onClick={handleDelete} className={styles.deleteBtn}>
        <PiTrashBold />
      </Button>
      <Button onClick={() => archiveNote(note)}>
        <MdOutlineArchive />
      </Button>
      <Button onClick={() => pinNote(note)}>
        {note.isPinned ? <RiPushpin2Fill /> : <RiPushpin2Line />}
      </Button>
    </motion.div>
  );
}
