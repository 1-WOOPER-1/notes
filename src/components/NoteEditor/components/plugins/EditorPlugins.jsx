import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

import styles from "../Lexical.module.scss";

export function EditorPlugins({ onChangeBody }) {
  return (
    <>
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            className={styles.editorBody}
            placeholder={
              <div className={styles.editorPlaceholder}>Take a note...</div>
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
  );
}
