import { useRef, useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import { PiTrashBold } from "react-icons/pi";
import { MdOutlineArchive } from "react-icons/md";
import { RiPushpin2Fill, RiPushpin2Line } from "react-icons/ri";
import { Button } from "@components/UI/Button/Button.jsx";
import styles from "./NoteCard.module.scss";
import { useNoteActions } from "@/hooks/useNoteActions";
import { useUI } from "@/hooks/useUI.js";
import { highlightTextInHTML } from "@/utils/highlightTextInHTML.js";

import { createEditor } from "lexical";
import { ParagraphNode, TextNode } from "lexical";
import { CodeNode } from "@lexical/code";
import { QuoteNode, HeadingNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { $generateHtmlFromNodes } from "@lexical/html";

const editor = createEditor({
  nodes: [
    ParagraphNode,
    TextNode,
    CodeNode,
    QuoteNode,
    HeadingNode,
    ListNode,
    ListItemNode,
    LinkNode,
  ],
});

export function NoteCard({ note, isOver, isDragging }) {
  const { attributes, listeners, setNodeRef } = useSortable({ id: note.id });
  const { openNote, pinNote, deleteNote, archiveNote } = useNoteActions();
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

  const [titleHTML, setTitleHTML] = useState("");
  const [bodyHTML, setBodyHTML] = useState("");
  useEffect(() => {
    const state = editor.parseEditorState(note.body);
    editor.setEditorState(state);
    editor.update(() => {
      const htmlString = $generateHtmlFromNodes(editor);
      setBodyHTML(highlightTextInHTML(htmlString, query));
    });

    const htmlString = `<h2>${note.title}</h2>`;
    setTitleHTML(highlightTextInHTML(htmlString, query));

    const el = bodyRef.current;
    if (!el) return;
    const resizeObserver = new ResizeObserver(() =>
      setIsOverflow(el.scrollHeight > el.clientHeight)
    );
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [note.title, note.body, query]);

  function handleDelete() {
    setIsDeleting(true);
    setTimeout(() => {
      deleteNote(note);
    }, 300);
  }

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
      <motion.div
        className={styles.noteCardToolbar}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <Button note={note} onClick={handleDelete} className={styles.deleteBtn}>
          <PiTrashBold />
        </Button>
        <Button note={note} onClick={archiveNote}>
          <MdOutlineArchive />
        </Button>
        <Button note={note} onClick={pinNote}>
          {note.isPinned ? <RiPushpin2Fill /> : <RiPushpin2Line />}
        </Button>
      </motion.div>
    </div>
  );
}
