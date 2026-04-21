import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

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
import { motion } from "motion/react";

import styles from "../Lexical.module.scss";
import { Tooltip } from "@components/UI/Tooltip/Tooltip";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface ToolbarPluginType {
  isMarkdownMode: boolean;
  setIsMarkdownMode: Dispatch<SetStateAction<boolean>>;
  markdownText: string;
  setMarkdownText: Dispatch<SetStateAction<string>>;
}

export function ToolbarPlugin({
  isMarkdownMode,
  setIsMarkdownMode,
  markdownText,
  setMarkdownText,
}: ToolbarPluginType) {
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const isTablet = useMediaQuery("(max-width: 768px)");

  const textFormatButtons = [
    { format: "bold", icon: <RiBold />, state: isBold, label: "Bold" },
    { format: "italic", icon: <RiItalic />, state: isItalic, label: "Italic" },
    {
      format: "underline",
      icon: <RiUnderline />,
      state: isUnderline,
      label: "Underline",
    },
    {
      format: "strikethrough",
      icon: <RiStrikethrough />,
      state: isStrikethrough,
      label: "Strikethrough",
    },
  ] as const;

  const alignButtons = [
    { align: "left", icon: <RiAlignLeft />, label: "Left" },
    { align: "center", icon: <RiAlignCenter />, label: "Center" },
    { align: "right", icon: <RiAlignRight />, label: "Right" },
    { align: "justify", icon: <RiAlignJustify />, label: "Justify" },
  ] as const;

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
    }
  }, []);

  const animation = isTablet
    ? {
        initial: { y: "3rem", x: "-3rem", opacity: 0 },
        animate: { y: "0rem", x: 0, opacity: 1 },
        exit: { y: "3rem", x: 0, opacity: 0 },
      }
    : {
        initial: { x: "3rem", y: 0, opacity: 0 },
        animate: { x: "0rem", y: 0, opacity: 1 },
        exit: { x: "3rem", y: 0, opacity: 0 },
      };

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
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_LOW,
      ),
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

  function btnClass(active: boolean) {
    return active
      ? `${styles.toolbarItem} ${styles.toolbarItemActive}`
      : styles.toolbarItem;
  }

  return (
    <motion.div
      className={styles.toolbar}
      {...animation}
      exit={{
        ...animation.exit,
        transition: {
          type: "tween",
          ease: "easeOut",
          delay: 0,
          duration: 0.08,
        },
      }}
      transition={{ type: "tween", ease: "easeOut", delay: 0.5 }}
    >
      <Tooltip text="Markdown mode">
        <button onClick={toggleMode} className={btnClass(isMarkdownMode)}>
          <RiMarkdownLine />
        </button>
      </Tooltip>

      <Tooltip text="Undo">
        <button
          disabled={!canUndo}
          onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
          className={styles.toolbarItem}
        >
          <IoMdUndo />
        </button>
      </Tooltip>

      <Tooltip text="Redo">
        <button
          disabled={!canRedo}
          onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
          className={styles.toolbarItem}
        >
          <IoMdRedo />
        </button>
      </Tooltip>

      <hr />

      {textFormatButtons.map(({ format, icon, state, label }) => (
        <Tooltip key={format} text={label}>
          <button
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, format)}
            className={btnClass(state)}
          >
            {icon}
          </button>
        </Tooltip>
      ))}

      <hr />

      {alignButtons.map(({ align, icon, label }) => (
        <Tooltip key={align} text={label}>
          <button
            onClick={() =>
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, align)
            }
            className={styles.toolbarItem}
          >
            {icon}
          </button>
        </Tooltip>
      ))}
    </motion.div>
  );
}
