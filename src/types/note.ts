import { SerializedEditorState } from "lexical";

interface BaseNote {
  id: string;
  title: string;
  body: SerializedEditorState;
  isPinned: boolean;
  createdAt: string;
  editedAt: string;
}

interface ActiveNote extends BaseNote {
  isPinned: boolean;
}

export interface BinNote extends BaseNote {
  deleteDate: string;
}

export type Note = ActiveNote | BinNote;
export type NoteCategory = "notes" | "archivedNotes" | "binNotes";

export function isBinNote(note: Note): note is BinNote {
  return "deleteDate" in note;
}
