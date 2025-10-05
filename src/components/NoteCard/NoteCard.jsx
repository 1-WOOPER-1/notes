import { useRef, useState, useEffect, useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import styles from "./NoteCard.module.scss";
import { useNoteActions } from "@/hooks/useNoteActions";
import { useUI } from "@/hooks/useUI.js";
import { highlightTextInHTML } from "@/utils/highlightTextInHTML.js";

import { Toolbar } from "./Toolbar.jsx";
import { getHTMLFromBody } from "./editor.js";

export function NoteCard({ note, isOver, isDragging }) {
  const { attributes, listeners, setNodeRef } = useSortable({ id: note.id });
  const { openNote } = useNoteActions();
  const { query } = useUI();

  const [isDeleting, setIsDeleting] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const bodyRef = useRef(null);
  const classNames = [
    styles.noteCard,
    isDeleting ? styles.deleting : "",
    isOver ? styles.over : "",
    isDragging ? styles.dragging : "",
  ];

  const HTMLFromBody = useMemo(() => getHTMLFromBody(note.body), [note.body]);
  const [titleHTML, setTitleHTML] = useState("");
  const [bodyHTML, setBodyHTML] = useState("");

  useEffect(() => {
    setBodyHTML(highlightTextInHTML(HTMLFromBody, query));
    setTitleHTML(highlightTextInHTML(`<h2>${note.title}</h2>`, query));

    const el = bodyRef.current;
    if (!el) return;
    const resizeObserver = new ResizeObserver(() =>
      setIsOverflow(el.scrollHeight > el.clientHeight)
    );
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [note.title, HTMLFromBody, query]);

  return (
    <div
      className={classNames.join(" ")}
      onClick={() => openNote(note)}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <div dangerouslySetInnerHTML={{ __html: titleHTML }} />
      <div
        ref={bodyRef}
        className={styles.noteBody}
        dangerouslySetInnerHTML={{ __html: bodyHTML }}
      />
      {isOverflow && <div>. . .</div>}
      <Toolbar note={note} hovered={hovered} setIsDeleting={setIsDeleting} />
    </div>
  );
}
