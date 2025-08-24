import { useContext } from "react";
import { NoteActionsContext } from "@/context/NoteActionsContext.js";

export function useNoteActions() {
  return useContext(NoteActionsContext);
}
