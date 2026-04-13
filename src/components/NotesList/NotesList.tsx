import { NotesContainer } from "@components/NotesContainer/NotesContainer";
import styles from "./NotesList.module.scss";
import { useSearch, useUI } from "@/context/UIContext";
import { lexicalToPlainText } from "@/utils/lexicalUtils";
import { Note } from "@/types/note";
import { Dispatch, memo, SetStateAction, useMemo } from "react";

interface NotesListType {
  notes: Note[];
  setNotes: Dispatch<SetStateAction<Note[]>>;
}

export const NotesList = memo(function NotesList({
  notes,
  setNotes,
}: NotesListType) {
  const { query } = useSearch();
  const { listView } = useUI();
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
              <NotesContainer notes={pinnedNotes} setNotes={setNotes} />
            </div>
          )}
          {!!pinnedNotes.length && !!otherNotes.length && <h4>Others</h4>}
          <NotesContainer notes={otherNotes} setNotes={setNotes} />
        </>
      )}
    </div>
  );
});
