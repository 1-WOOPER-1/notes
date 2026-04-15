import { useState, useEffect, useRef, RefObject } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { motion } from "motion/react";

import { editorConfig } from "./config/editorConfig";
import { EditorPlugins } from "./plugins/EditorPlugins";
import { ToolbarPlugin } from "./plugins/ToolbarPlugin";
import { EditorHeader } from "./EditorHeader";
import styles from "./Lexical.module.scss";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useNotesStore } from "@/stores/useNotesStore";
import { formatEditedAt } from "./formatDate";
import { Tooltip } from "@components/UI/Tooltip/Tooltip";
import { Note } from "@/types/note";
import { EditorState } from "lexical";

interface LexicalType {
  note: Note;
  editorRef: RefObject<HTMLDivElement | null>;
  closeEditor: () => void;
}

export function Lexical({ note, editorRef, closeEditor }: LexicalType) {
  const [isMarkdownMode, setIsMarkdownMode] = useState(false);
  const [markdownText, setMarkdownText] = useState("");
  const titleRef = useRef<HTMLDivElement>(null);
  const localNoteRef = useRef({ ...note });
  const saveNote = useNotesStore((state) => state.saveNote);

  useClickOutside(editorRef, null, () => {
    if (!checkIsEdited) {
      localNoteRef.current.editedAt = new Date().toISOString();
      saveNote(localNoteRef.current);
    }
    closeEditor();
  });

  function onChangeTitle(title: string) {
    localNoteRef.current.title = title;
  }

  function onChangeBody(editorState: EditorState) {
    const editorStateJSON = editorState.toJSON();
    localNoteRef.current.body = editorStateJSON;
  }

  function checkIsEdited() {
    const original = JSON.stringify(note);
    const current = JSON.stringify(localNoteRef.current);
    return original === current;
  }

  useEffect(() => {
    localNoteRef.current = { ...note };
    if (titleRef.current) {
      titleRef.current.innerText = note.title ? note.title : "";
    }
  }, [note]);

  return (
    <LexicalComposer
      key={note.id}
      initialConfig={{
        ...editorConfig,
        editorState: JSON.stringify(note.body),
      }}
    >
      <motion.div
        initial={{ x: "3rem" }}
        animate={{ x: "0rem" }}
        exit={{ x: "3rem" }}
        transition={{ type: "tween", ease: "easeOut", delay: 0.5 }}
      >
        <ToolbarPlugin
          isMarkdownMode={isMarkdownMode}
          setIsMarkdownMode={setIsMarkdownMode}
          markdownText={markdownText}
          setMarkdownText={setMarkdownText}
        />
      </motion.div>
      <motion.div
        className={styles.editorInner}
        layoutId={String(note.id)}
        transition={{ type: "tween", duration: 0.35, ease: "easeInOut" }}
      >
        <EditorHeader
          titleRef={titleRef}
          onChangeTitle={onChangeTitle}
          onSaveAndClose={() => {
            if (!checkIsEdited()) {
              localNoteRef.current.editedAt = new Date().toISOString();
              saveNote(localNoteRef.current);
            }
            closeEditor();
          }}
        />
        {isMarkdownMode ? (
          <textarea
            className={styles.editorMarkdown}
            value={markdownText}
            onChange={(event) => setMarkdownText(event.target.value)}
          />
        ) : (
          <EditorPlugins onChangeBody={onChangeBody} />
        )}
        <span className={styles.editInfo}>
          <Tooltip text={`Created ${formatEditedAt(note.createdAt)}`}>
            <span>Edited at {formatEditedAt(note.editedAt)}</span>
          </Tooltip>
        </span>
      </motion.div>
    </LexicalComposer>
  );
}
