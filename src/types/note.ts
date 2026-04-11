import { SerializedEditorState } from "lexical";

interface BaseNote {
  id: number;
  title: string;
  body: SerializedEditorState;
  isPinned: boolean;
  createdAt: string;
  editedAt: string;
}

interface ActiveNote extends BaseNote {
  isPinned: boolean;
}

interface BinNote extends BaseNote {
  deleteDate: string;
}

export type Note = ActiveNote | BinNote;
