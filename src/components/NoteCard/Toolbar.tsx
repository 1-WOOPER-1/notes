import { motion } from "framer-motion";
import { PiTrashBold } from "react-icons/pi";
import { MdOutlineArchive } from "react-icons/md";
import { RiPushpin2Fill, RiPushpin2Line } from "react-icons/ri";
import { Button } from "@components/UI/Button/Button";
import { useNoteActions } from "@/context/NoteActionsContext";
import styles from "./NoteCard.module.scss";
import { Note } from "@/types/note";
import { Dispatch, SetStateAction } from "react";

interface ToolbarType {
  note: Note;
  hovered: boolean;
  setIsDeleting: Dispatch<SetStateAction<boolean>>;
}

export function Toolbar({ note, hovered, setIsDeleting }: ToolbarType) {
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
      <Button
        onClick={handleDelete}
        className={styles.deleteBtn}
        toolTipText="Delete note"
      >
        <PiTrashBold />
      </Button>
      <Button onClick={() => archiveNote(note)} toolTipText="Arhive">
        <MdOutlineArchive />
      </Button>
      <Button onClick={() => pinNote(note)} toolTipText="Pin note">
        {note.isPinned ? <RiPushpin2Fill /> : <RiPushpin2Line />}
      </Button>
    </motion.div>
  );
}
