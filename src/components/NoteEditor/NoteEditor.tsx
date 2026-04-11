import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Lexical } from "./components/Lexical";
import styles from "./NoteEditor.module.scss";
import { useUI } from "@/context/UIContext";
import { getBasePath } from "@/utils/routeUtils";

export function NoteEditor() {
  const navigate = useNavigate();
  const location = useLocation();
  const { openedNote, setOpenedNote } = useUI();
  const editorRef = useRef(null);
  if (!openedNote) return;

  function closeEditor() {
    setOpenedNote(null);
    navigate(getBasePath(location.pathname), { replace: true });
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Lexical
              note={{ ...openedNote }}
              editorRef={editorRef}
              closeEditor={closeEditor}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
