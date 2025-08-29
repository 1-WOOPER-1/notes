import { useLocation, useNavigate } from "react-router-dom";
import { NoteActionsContext } from "@/context/NoteActionsContext.js";
import { getBasePath } from "@/utils/routeUtils.js";

export function NoteActionsProvider({ setNotes, setArchivedNotes, children }) {
  const location = useLocation();
  const navigate = useNavigate();

  function openNote(note) {
    const basePath = getBasePath(location.pathname);
    if (basePath === "/") {
      navigate(`${location.pathname}/${note.id}`);
    } else {
      navigate(`${basePath}/${note.id}`);
    }
  }

  function pinNote(note) {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === note.id ? { ...n, isPinned: !note.isPinned } : n
      )
    );
  }

  function deleteNote(note) {
    setNotes((prev) => prev.filter((n) => n.id !== note.id));
  }

  function archiveNote(note) {
    setArchivedNotes((prev) => [...prev, { ...note, isPinned: false }]);
    setNotes((prev) => prev.filter((n) => n.id !== note.id));
  }

  return (
    <NoteActionsContext.Provider
      value={{ openNote, pinNote, deleteNote, archiveNote }}
    >
      {children}
    </NoteActionsContext.Provider>
  );
}
