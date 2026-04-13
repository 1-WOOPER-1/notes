import { useRef, useState } from "react";
import { UserModal } from "./UserModal";
import { Button } from "@components/UI/Button/Button";
import { DefaultUserIcon } from "@/icons/DefaultUserIcon";
import { useClickOutside } from "@/hooks/useClickOutside";
import styles from "./UserModal.module.scss";

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
      {isOpen && (
        <div ref={modalRef}>
          <UserModal onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  );
}
