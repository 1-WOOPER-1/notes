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
      <div className={`${styles.listItem} ${styles["listItem--top"]}`}>
        <FiAtSign className={styles.icon} />
        <input type="text" placeholder="Type your nickname" />
      </div>
      <div className={`${styles.listItem} ${styles["listItem--bottom"]}`}>
        <PiEnvelopeSimpleBold className={styles.icon} />
        <p style={{ color: "darkgray" }}>v123vladimir@gmail.com</p>
      </div>
      <Button
        className={`${styles.listItem} ${styles["listItem--top"]} ${styles.btn}`}
        onClick={() => {}}
      >
        <PiSignOutBold className={styles.icon} />
        <span>Sign out</span>
      </Button>
      <Button
        className={`${styles.listItem} ${styles["listItem--bottom"]} ${styles.btn}`}
        onClick={() => {}}
      >
        <FaRegTrashAlt style={{ fontSize: "1rem" }} />
        <span>Delete account</span>
      </Button>
    </div>
  );
}
