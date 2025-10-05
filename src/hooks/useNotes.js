import { useContext } from "react";
import { NotesContext } from "@/context/NotesContext.js";

export function useNotes() {
  return useContext(NotesContext);
}
