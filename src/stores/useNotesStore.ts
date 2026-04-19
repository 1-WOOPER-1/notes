import { create } from "zustand";
import { persist } from "zustand/middleware";
import { arrayMove } from "@dnd-kit/sortable";
import { BinNote, Note } from "@/types/note";
import { SerializedEditorState, SerializedLexicalNode } from "lexical";
import { NOTES } from "@/data/notes";
import { ARCHIVED_NOTES } from "@/data/archivedNotes";
import { BIN_NOTES } from "@/data/binNotes";

interface NotesState {
  notes: Note[];
  archivedNotes: Note[];
  binNotes: Note[];

  setNotes: (notes: Note[]) => void;
  reorderNotes: (
    category: "notes" | "archivedNotes" | "binNotes",
    activeId: string,
    overId: string,
  ) => void;
  createNewNote: () => Note;
  pinNote: (note: Note) => void;
  saveNote: (note: Note) => void;
  deleteNote: (note: Note) => void;
  archiveNote: (note: Note) => void;
  unArchiveNote: (note: Note) => void;
  restoreNote: (note: BinNote) => void;
}

function createEmptyBody(): SerializedEditorState {
  return {
    root: {
      type: "root",
      version: 1,
      direction: "ltr",
      format: "",
      indent: 0,
      children: [
        {
          type: "paragraph",
          version: 1,
          direction: "ltr",
          format: "",
          indent: 0,
          children: [
            {
              type: "text",
              version: 1,
              text: "",
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
            } as unknown as SerializedLexicalNode,
          ],
        } as unknown as SerializedLexicalNode,
      ],
    },
  };
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: NOTES,
      archivedNotes: ARCHIVED_NOTES,
      binNotes: BIN_NOTES,

      setNotes: (notes) => set({ notes }),

      reorderNotes: (category, activeId, overId) => {
        set((state) => {
          const list = state[category];
          const oldIndex = list.findIndex((n) => n.id === activeId);
          const newIndex = list.findIndex((n) => n.id === overId);

          if (oldIndex === -1 || newIndex === -1) return state;
          const newList = arrayMove(list, oldIndex, newIndex);
          return { [category]: newList };
        });
      },

      createNewNote: () => {
        const newNote: Note = {
          id: String(Date.now()),
          title: "",
          body: createEmptyBody(),
          isPinned: false,
          createdAt: new Date().toISOString(),
          editedAt: new Date().toISOString(),
        };
        set((state) => ({ notes: [newNote, ...state.notes] }));
        return newNote;
      },

      pinNote: (note) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === note.id ? { ...n, isPinned: !n.isPinned } : n,
          ),
        })),

      saveNote: (note) =>
        set((state) => ({
          notes: state.notes.map((n) => (n.id === note.id ? { ...note } : n)),
        })),

      archiveNote: (note) =>
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== note.id),
          archivedNotes: [...state.archivedNotes, { ...note, isPinned: false }],
        })),

      unArchiveNote: (note) =>
        set((state) => ({
          archivedNotes: state.archivedNotes.filter((n) => n.id !== note.id),
          notes: [...state.notes, { ...note, isPinned: false }],
        })),

      deleteNote: (note) => {
        const now = new Date();
        const plus30Days = new Date(now);
        plus30Days.setDate(now.getDate() + 30);
        const deleteDate = plus30Days.toISOString();

        set((state) => ({
          notes: state.notes.filter((n) => n.id !== note.id),
          binNotes: [
            ...state.binNotes,
            { ...note, isPinned: false, deleteDate },
          ],
        }));
      },

      restoreNote: (note: BinNote) => {
        const { deleteDate, ...restoreNote } = note;

        return set((state) => ({
          binNotes: state.binNotes.filter((n) => n.id !== note.id),
          notes: [...state.notes, { ...restoreNote, isPinned: false }],
        }));
      },
    }),
    { name: "notes-storage" },
  ),
);
