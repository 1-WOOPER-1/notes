import { memo } from "react";
import { PiTrashBold } from "react-icons/pi";
import { MdOutlineArchive } from "react-icons/md";
import { RiPushpin2Fill, RiPushpin2Line } from "react-icons/ri";
import { useShallow } from "zustand/shallow";
import { Button } from "@components/UI/Button/Button";
import styles from "./NoteCard.module.scss";
import { Note } from "@/types/note";
import { useNotesStore } from "@/stores/useNotesStore";

interface ToolbarType {
  note: Note;
}

export const Toolbar = memo(function Toolbar({ note }: ToolbarType) {
  const { pinNote, deleteNote, archiveNote } = useNotesStore(
    useShallow((state) => ({
      pinNote: state.pinNote,
      deleteNote: state.deleteNote,
      archiveNote: state.archiveNote,
    })),
  );

  function handleDelete() {
    deleteNote(note);
  }

  return (
    <div className={styles.noteCardToolbar}>
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
    </div>
  );
});
