import React from "react";
import styles from "./Button.module.scss";
import { Tooltip } from "@components/UI/Tooltip/Tooltip";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
  toolTipText?: string;
}

export function Button({
  children,
  className,
  onClick,
  toolTipText,
}: ButtonProps) {
  return (
    <Tooltip text={toolTipText}>
      <button
        className={`${styles.button} ${className || ""}`}
        onClick={(event) => {
          event.stopPropagation();
          onClick();
        }}
      >
        {children}
      </button>
    </Tooltip>
  );
}
