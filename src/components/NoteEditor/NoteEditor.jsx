import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Lexical } from "./components/Lexical.jsx";
import styles from "./NoteEditor.module.scss";
import { useUI } from "@/hooks/useUI.js";
import { getBasePath } from "@/utils/routeUtils.js";

export function NoteEditor({ setNotes }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { openedNote, setOpenedNote } = useUI();
  const editorRef = useRef(null);
  if (!openedNote) return;

  function closeEditor() {
    setOpenedNote(null);
    navigate(getBasePath(location.pathname), { replace: true });
  }

  function saveNote(note) {
    setNotes((prev) => prev.map((n) => (n.id === note.id ? { ...note } : n)));
  }

  return (
    <AnimatePresence>
      {openedNote && (
        <motion.div
          key="shadow"
          className={styles.shadow}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={editorRef}
            className={styles.noteEditor}
            layoutId={openedNote.id}
          >
            <Lexical
              note={{ ...openedNote }}
              editorRef={editorRef}
              closeEditor={closeEditor}
              saveNote={saveNote}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
