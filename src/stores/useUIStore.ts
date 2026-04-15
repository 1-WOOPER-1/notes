import { create } from "zustand";
import { Note } from "@/types/note";

interface UIState {
  query: string;
  listView: boolean;
  openedNote: Note | null;
  pendingOpenNoteId: string | null;
  setPendingOpenNoteId: (id: string | null) => void;
  setQuery: (query: string) => void;
  toggleView: () => void;
  setOpenedNote: (note: Note | null) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  query: "",
  listView: false,
  openedNote: null,
  pendingOpenNoteId: null,
  setPendingOpenNoteId: (id: string | null) => set({ pendingOpenNoteId: id }),
  setQuery: (query) => set({ query }),
  toggleView: () => set((state) => ({ listView: !state.listView })),
  setOpenedNote: (note) => set({ openedNote: note }),
}));
