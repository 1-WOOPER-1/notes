import { PiEnvelopeSimpleBold, PiSignOutBold } from "react-icons/pi";
import { FiAtSign } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import styles from "./UserModal.module.scss";
import { DefaultUserIcon } from "@/icons/DefaultUserIcon";
import { Button } from "@components/UI/Button/Button";

interface UserModalProps {
  onClose: () => void;
}

export function UserModal({ onClose }: UserModalProps) {
  return (
    <div className={styles.userModal}>
      <div className={styles.closeBtn}>
        <Button onClick={onClose}>
          <IoCloseOutline style={{ fontSize: "2rem" }} />
        </Button>
      </div>
      <DefaultUserIcon className={styles.avatar} />
      <div className={`${styles.listItem} ${styles.listItemTop}`}>
        <FiAtSign style={{ fontSize: "1.3rem" }} />
        <input
          className={styles.input}
          type="text"
          placeholder="Type your nickname"
        />
      </div>
      <div className={`${styles.listItem} ${styles.listItemBottom}`}>
        <PiEnvelopeSimpleBold style={{ fontSize: "1.3rem" }} />
        <p style={{ color: "darkgray" }}>v123vladimir@gmail.com</p>
      </div>
      <button
        className={`${styles.listItem} ${styles.listItemTop} ${styles.btn}`}
      >
        <PiSignOutBold style={{ fontSize: "1.3rem" }} />
        <p>Sign out</p>
      </button>
      <button
        className={`${styles.listItem} ${styles.listItemBottom} ${styles.btn}`}
      >
        <FaRegTrashAlt style={{ fontSize: "1rem" }} />
        <p>Delete account</p>
      </button>
    </div>
  );
}
