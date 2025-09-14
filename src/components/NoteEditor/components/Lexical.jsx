import { useState, useEffect, useRef } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";

import { editorConfig } from "./config/editorConfig.js";
import { EditorPlugins } from "./plugins/EditorPlugins.jsx";
import ToolbarPlugin from "./plugins/ToolbarPlugin.jsx";
import { EditorHeader } from "./EditorHeader.jsx";
import styles from "./Lexical.module.scss";

export function Lexical({ note, closeEditor, saveNote }) {
  const [isMarkdownMode, setIsMarkdownMode] = useState(false);
  const [markdownText, setMarkdownText] = useState("");
  const titleRef = useRef();
  const localNoteRef = useRef({ ...note });

  function onChangeTitle(title) {
    localNoteRef.current.title = title;
  }

  function onChangeBody(editorState) {
    const editorStateJSON = editorState.toJSON();
    localNoteRef.current.body = editorStateJSON;
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
      <ToolbarPlugin
        isMarkdownMode={isMarkdownMode}
        setIsMarkdownMode={setIsMarkdownMode}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
      />
      <div className={styles.editorInner}>
        <EditorHeader
          titleRef={titleRef}
          onChangeTitle={onChangeTitle}
          onSaveAndClose={() => {
            saveNote(localNoteRef.current);
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
      </div>
    </LexicalComposer>
  );
}
