import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useShallow } from "zustand/shallow";
import { Lexical } from "./components/Lexical";
import styles from "./NoteEditor.module.scss";
import { getBasePath } from "@/utils/routeUtils";
import { useUIStore } from "@/stores/useUIStore";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

export function NoteEditor() {
  const navigate = useNavigate();
  const location = useLocation();
  const { openedNote, setOpenedNote } = useUIStore(
    useShallow((state) => ({
      openedNote: state.openedNote,
      setOpenedNote: state.setOpenedNote,
    })),
  );
  const editorRef = useRef(null);
  useBodyScrollLock(!!openedNote);
  console.log(openedNote);

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
