import { useCallback, useEffect, useRef, useState } from "react";

import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_LOW,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";

import {
  $convertToMarkdownString,
  $convertFromMarkdownString,
  TRANSFORMERS,
} from "@lexical/markdown";

import { IoMdUndo, IoMdRedo } from "react-icons/io";
import {
  RiMarkdownLine,
  RiBold,
  RiItalic,
  RiUnderline,
  RiStrikethrough,
  RiAlignLeft,
  RiAlignCenter,
  RiAlignRight,
  RiAlignJustify,
} from "react-icons/ri";

import styles from "../Lexical.module.scss"; // путь к твоему модулю

export default function ToolbarPlugin({
  isMarkdownMode,
  setIsMarkdownMode,
  markdownText,
  setMarkdownText,
}) {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW
      )
    );
  }, [editor, $updateToolbar]);

  const toggleMode = () => {
    if (!isMarkdownMode) {
      editor.update(() => {
        const markdown = $convertToMarkdownString(TRANSFORMERS);
        setMarkdownText(markdown);
      });
    } else {
      editor.update(() => {
        const root = $getRoot();
        root.clear();
        $convertFromMarkdownString(markdownText, TRANSFORMERS);
      });
    }
    setIsMarkdownMode(!isMarkdownMode);
  };

  function btnClass(active) {
    return active
      ? `${styles.toolbarItem} ${styles.toolbarItemActive}`
      : styles.toolbarItem;
  }

  return (
    <div className={styles.toolbar} ref={toolbarRef}>
      <button onClick={toggleMode} className={btnClass(isMarkdownMode)}>
        <RiMarkdownLine />
      </button>

      <button
        disabled={!canUndo}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        className={styles.toolbarItem}
      >
        <IoMdUndo />
      </button>

      <button
        disabled={!canRedo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        className={styles.toolbarItem}
      >
        <IoMdRedo />
      </button>

      <hr />

      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        className={btnClass(isBold)}
      >
        <RiBold />
      </button>

      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        className={btnClass(isItalic)}
      >
        <RiItalic />
      </button>

      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
        className={btnClass(isUnderline)}
      >
        <RiUnderline />
      </button>

      <button
        onClick={() =>
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
        }
        className={btnClass(isStrikethrough)}
      >
        <RiStrikethrough />
      </button>

      <hr />

      <button
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
        className={styles.toolbarItem}
      >
        <RiAlignLeft />
      </button>

      <button
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
        className={styles.toolbarItem}
      >
        <RiAlignCenter />
      </button>

      <button
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}
        className={styles.toolbarItem}
      >
        <RiAlignRight />
      </button>

      <button
        onClick={() =>
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
        }
        className={styles.toolbarItem}
      >
        <RiAlignJustify />
      </button>
    </div>
  );
}
