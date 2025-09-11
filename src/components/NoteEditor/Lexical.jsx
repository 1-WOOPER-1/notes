import { useState, useEffect, useRef } from "react";

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";

import { ParagraphNode, TextNode } from "lexical";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { CodeNode } from "@lexical/code";
import { LinkNode } from "@lexical/link";
import { TRANSFORMERS } from "@lexical/markdown";

import { IoCloseOutline } from "react-icons/io5";

import { ExampleTheme } from "./ExampleTheme.js";
import ToolbarPlugin from "./plugins/ToolbarPlugin.jsx";
import { Button } from "@components/Button/Button.jsx";
import styles from "./Lexical.module.scss";

const editorConfig = {
  namespace: "NoteEditor",
  theme: ExampleTheme,
  nodes: [
    ParagraphNode,
    TextNode,
    HeadingNode,
    QuoteNode,
    ListNode,
    ListItemNode,
    CodeNode,
    LinkNode,
  ],
  onError(error) {
    throw error;
  },
};

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
      <div className={styles.editorContainer}>
        <ToolbarPlugin
          isMarkdownMode={isMarkdownMode}
          setIsMarkdownMode={setIsMarkdownMode}
          markdownText={markdownText}
          setMarkdownText={setMarkdownText}
        />
        <div className={styles.editorInner}>
          <div className={styles.editorTitle}>
            <div
              ref={titleRef}
              className={styles.title}
              contentEditable
              suppressContentEditableWarning
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
              onInput={(event) =>
                onChangeTitle(
                  event.currentTarget.innerText
                    .replace(/[\n\r\t]/g, "")
                    .slice(0, 100)
                )
              }
            />

            <Button
              className={styles.closeBtn}
              onClick={() => {
                saveNote(localNoteRef.current);
                closeEditor();
              }}
            >
              <IoCloseOutline />
            </Button>
          </div>
          {isMarkdownMode ? (
            <textarea
              className={styles.editorMarkdown}
              value={markdownText}
              onChange={(event) => setMarkdownText(event.target.value)}
            />
          ) : (
            <>
              <RichTextPlugin
                contentEditable={
                  <ContentEditable
                    className={styles.editorBody}
                    placeholder={
                      <div className={styles.editorPlaceholder}>
                        Take a note...
                      </div>
                    }
                  />
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
              <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
              <OnChangePlugin onChange={onChangeBody} />
              <LinkPlugin />
              <HistoryPlugin />
              <AutoFocusPlugin />
            </>
          )}
        </div>
      </div>
    </LexicalComposer>
  );
}
