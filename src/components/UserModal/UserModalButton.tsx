import { useRef, useState } from "react";
import { UserModal } from "./UserModal";
import { motion } from "motion/react";
import { Button } from "@components/UI/Button/Button";
import { DefaultUserIcon } from "@/icons/DefaultUserIcon";
import { useClickOutside } from "@/hooks/useClickOutside";
import { AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";

interface ToggleViewButtonProps {
  className?: string;
  showLabel?: boolean;
}

export function UserModalButton({
  className,
  showLabel,
}: ToggleViewButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useClickOutside(modalRef, btnRef, toggleModal);

  function toggleModal() {
    setIsOpen((prev) => !prev);
  }

  return (
    <>
      <Button
        ref={btnRef}
        className={className}
        onClick={toggleModal}
        toolTipText={showLabel ? undefined : "Account"}
      >
        <DefaultUserIcon
          style={showLabel ? { fontSize: "1rem" } : { fontSize: "1.8rem" }}
        />
        {showLabel && <span>Account</span>}
      </Button>
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <UserModal onClose={() => setIsOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
