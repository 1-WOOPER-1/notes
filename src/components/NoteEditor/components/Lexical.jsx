import { useState, useEffect, useRef } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { motion } from "framer-motion";

import { editorConfig } from "./config/editorConfig.js";
import { EditorPlugins } from "./plugins/EditorPlugins.jsx";
import { ToolbarPlugin } from "./plugins/ToolbarPlugin.jsx";
import { EditorHeader } from "./EditorHeader.jsx";
import styles from "./Lexical.module.scss";
import { useClickOutside } from "@/hooks/useClickOutside.js";
import { useNoteActions } from "@/hooks/useNoteActions.js";
import { formatEditedAt } from "./formatDate.js";

export function Lexical({ note, editorRef, closeEditor }) {
  const [isMarkdownMode, setIsMarkdownMode] = useState(false);
  const [markdownText, setMarkdownText] = useState("");
  const titleRef = useRef();
  const localNoteRef = useRef({ ...note });
  const { saveNote } = useNoteActions();

  useClickOutside(editorRef, null, () => {
    localNoteRef.current.editedAt = new Date().toISOString();
    saveNote(localNoteRef.current);
    closeEditor();
  });

  function onChangeTitle(title) {
    localNoteRef.current.title = title;
  }

  function onChangeBody(editorState) {
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
    titleRef.current.innerText = note.title ? note.title : "";
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
        layoutId={note.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
          Edited at {formatEditedAt(note.editedAt)}
        </span>
      </motion.div>
    </LexicalComposer>
  );
}
