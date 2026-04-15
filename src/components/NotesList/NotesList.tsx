import { NotesContainer } from "@components/NotesContainer/NotesContainer";
import styles from "./NotesList.module.scss";
import { useUIStore } from "@/stores/useUIStore";
import { lexicalToPlainText } from "@/utils/lexicalUtils";
import { memo, useMemo } from "react";
import { useNotesStore } from "@/stores/useNotesStore";

interface NotesListType {
  category: "notes" | "archivedNotes" | "binNotes";
}

export const NotesList = memo(function NotesList({ category }: NotesListType) {
  const notes = useNotesStore((state) => state[category]);
  const query = useUIStore((state) => state.query);
  const listView = useUIStore((state) => state.listView);
  const pinnedNotes = useMemo(
    () => notes.filter((note) => note.isPinned),
    [notes],
  );
  const otherNotes = useMemo(
    () => notes.filter((note) => !note.isPinned),
    [notes],
  );
  const filteredNotes = useMemo(
    () =>
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          lexicalToPlainText(note.body)
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [notes, query],
  );

  return (
    <div className={`${styles.notesList} ${listView ? styles.listView : ""}`}>
      {!!query.trim().length ? (
        <NotesContainer notes={filteredNotes} />
      ) : (
        <>
          {!!pinnedNotes.length && (
            <div>
              <h4>Pinned</h4>
              <NotesContainer notes={pinnedNotes} category={category} />
            </div>
          )}
          {!!pinnedNotes.length && !!otherNotes.length && <h4>Others</h4>}
          <NotesContainer notes={otherNotes} category={category} />
        </>
      )}
    </div>
  );
});
