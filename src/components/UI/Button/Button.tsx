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
  function handleClick(event: React.MouseEvent) {
    event.stopPropagation();
    onClick();
  }

  const button = (
    <button
      className={`${styles.button} ${className || ""}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );

  if (!toolTipText) return button;

  return <Tooltip text={toolTipText}>{button}</Tooltip>;
}
