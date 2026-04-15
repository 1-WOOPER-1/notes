import { useRef, useState, useEffect, useMemo, memo, useCallback } from "react";
import { motion } from "motion/react";
import { useShallow } from "zustand/shallow";
import styles from "./NoteCard.module.scss";
import { highlightTextInHTML } from "@/utils/highlightTextInHTML";

import { Toolbar } from "./Toolbar";
import { getHTMLFromBody } from "./editor";
import { Note } from "@/types/note";
import { useUIStore } from "@/stores/useUIStore";

import { useOpenNote } from "@/hooks/useOpenNote";

interface NoteCardType {
  note: Note;
  isOver?: boolean;
  isDragging?: boolean;
}

export const NoteCard = memo(function NoteCard({
  note,
  isOver,
  isDragging,
}: NoteCardType) {
  const { query, pendingOpenNoteId, setPendingOpenNoteId } = useUIStore(
    useShallow((state) => ({
      query: state.query,
      pendingOpenNoteId: state.pendingOpenNoteId,
      setPendingOpenNoteId: state.setPendingOpenNoteId,
    })),
  );

  const [isOverflow, setIsOverflow] = useState(false);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const classNames = useMemo(
    () => [
      styles.noteCard,
      isOver ? styles.over : "",
      isDragging ? styles.dragging : "",
    ],
    [isOver, isDragging],
  );

  const HTMLFromBody = useMemo(() => getHTMLFromBody(note.body), [note.body]);
  const html = useMemo(() => {
    return {
      title: highlightTextInHTML(`<h2>${note.title}</h2>`, query),
      body: highlightTextInHTML(HTMLFromBody, query),
    };
  }, [note.title, note.id, HTMLFromBody, query]);

  const openNote = useOpenNote();
  const handleOpenNote = useCallback(() => {
    openNote(note);
  }, [note, openNote]);

  useEffect(() => {
    if (pendingOpenNoteId === note.id) {
      setPendingOpenNoteId(null);
      openNote(note);
    }
  }, [pendingOpenNoteId]);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const resizeObserver = new ResizeObserver(() =>
      setIsOverflow(el.scrollHeight > el.clientHeight),
    );
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <motion.div
      className={classNames.join(" ")}
      onClick={handleOpenNote}
      layoutId={String(note.id)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "tween",
        duration: 0.35,
        ease: "easeInOut",
      }}
      exit={{ opacity: 0, scale: 0.9, backgroundColor: "red" }}
    >
      <div dangerouslySetInnerHTML={{ __html: html.title }} />
      <div
        ref={bodyRef}
        className={styles.noteBody}
        dangerouslySetInnerHTML={{ __html: html.body }}
      />
      {isOverflow && <div>. . .</div>}
      <Toolbar note={note} />
    </motion.div>
  );
});
