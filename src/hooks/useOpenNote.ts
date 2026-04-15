import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Note } from "@/types/note";
import { useUIStore } from "@/stores/useUIStore";

export function useOpenNote() {
  const navigate = useNavigate();
  const location = useLocation();
  const setOpenedNote = useUIStore((state) => state.setOpenedNote);

  return useCallback(
    (note: Note) => {
      setOpenedNote(note);
      const base = location.pathname.split("/").slice(0, 2).join("/");
      navigate(`${base}/${note.id}`);
    },
    [location.pathname, navigate, setOpenedNote],
  );
}
