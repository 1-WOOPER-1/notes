import { memo } from "react";
import { PiTrashBold } from "react-icons/pi";
import {
  MdOutlineArchive,
  MdOutlineRestore,
  MdOutlineUnarchive,
} from "react-icons/md";
import { RiPushpin2Fill, RiPushpin2Line } from "react-icons/ri";
import { useShallow } from "zustand/shallow";
import { Button } from "@components/UI/Button/Button";
import styles from "./NoteCard.module.scss";
import { isBinNote, Note, NoteCategory } from "@/types/note";
import { useNotesStore } from "@/stores/useNotesStore";

interface ToolbarType {
  note: Note;
  category: NoteCategory;
}

export const Toolbar = memo(function Toolbar({ note, category }: ToolbarType) {
  const { pinNote, deleteNote, archiveNote, unArchiveNote, restoreNote } =
    useNotesStore(
      useShallow((state) => ({
        pinNote: state.pinNote,
        deleteNote: state.deleteNote,
        archiveNote: state.archiveNote,
        unArchiveNote: state.unArchiveNote,
        restoreNote: state.restoreNote,
      })),
    );

  return (
    <div className={styles.noteCardToolbar}>
      {category !== "binNotes" && (
        <Button
          onClick={() => deleteNote(note)}
          className={styles.deleteBtn}
          toolTipText="Delete"
        >
          <PiTrashBold />
        </Button>
      )}

      {category === "notes" && (
        <Button onClick={() => archiveNote(note)} toolTipText="Arhive">
          <MdOutlineArchive />
        </Button>
      )}

      {category === "archivedNotes" && (
        <Button onClick={() => unArchiveNote(note)} toolTipText="Unarchive">
          <MdOutlineUnarchive />
        </Button>
      )}

      {category === "notes" && (
        <Button
          onClick={() => pinNote(note)}
          className={styles.pinBtn}
          toolTipText="Pin"
        >
          {note.isPinned ? <RiPushpin2Fill /> : <RiPushpin2Line />}
        </Button>
      )}

      {category === "binNotes" && isBinNote(note) && (
        <Button onClick={() => restoreNote(note)} toolTipText="Restore">
          <MdOutlineRestore />
        </Button>
      )}
    </div>
  );
});
