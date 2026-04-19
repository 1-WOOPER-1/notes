import { useRef, useState } from "react";
import { UserModal } from "./UserModal";
import { motion } from "motion/react";
import { Button } from "@components/UI/Button/Button";
import { DefaultUserIcon } from "@/icons/DefaultUserIcon";
import { useClickOutside } from "@/hooks/useClickOutside";
import styles from "./UserModal.module.scss";
import { AnimatePresence } from "motion/react";

export function UserModalButton() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, btnRef, toggleModal);

  function toggleModal() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div ref={btnRef}>
      <Button
        className={styles.userModalBtn}
        onClick={toggleModal}
        toolTipText="Account"
      >
        <DefaultUserIcon style={{ fontSize: "1.8rem" }} />
      </Button>
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
      </AnimatePresence>
    </div>
  );
}
