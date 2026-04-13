import { useRef, useState, useEffect, useMemo, memo } from "react";
import { motion } from "framer-motion";
import styles from "./NoteCard.module.scss";
import { useNoteActions } from "@/context/NoteActionsContext";
import { useSearch } from "@/context/UIContext";
import { highlightTextInHTML } from "@/utils/highlightTextInHTML";

import { Toolbar } from "./Toolbar";
import { getHTMLFromBody } from "./editor";
import { Note } from "@/types/note";

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
  const { openNote } = useNoteActions();
  const { query } = useSearch();

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
  const [html, setHtml] = useState({ title: "", body: "" });

  useEffect(() => {
    setHtml({
      title: highlightTextInHTML(`<h2>${note.title}</h2>`, query),
      body: highlightTextInHTML(HTMLFromBody, query),
    });
  }, [note.title, HTMLFromBody, query]);

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
      onClick={() => openNote(note)}
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
