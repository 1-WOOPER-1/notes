import { IoCloseOutline } from "react-icons/io5";
import { Button } from "@components/UI/Button/Button";
import styles from "./Lexical.module.scss";
import { RefObject } from "react";

interface EditroHeaderType {
  titleRef: RefObject<HTMLDivElement | null>;
  onChangeTitle: (title: string) => void;
  onSaveAndClose: () => void;
}

export function EditorHeader({
  titleRef,
  onChangeTitle,
  onSaveAndClose,
}: EditroHeaderType) {
  return (
    <div className={styles.editorHeader}>
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
              .slice(0, 100),
          )
        }
      />
      <Button className={styles.closeBtn} onClick={onSaveAndClose}>
        <IoCloseOutline />
      </Button>
    </div>
  );
}
