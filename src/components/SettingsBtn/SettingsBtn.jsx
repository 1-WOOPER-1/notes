import { PiGearFineBold } from "react-icons/pi";
import styles from "./SettingsBtn.module.css";

export function SettingsBtn() {
  return (
    <button className={styles.settingsBtn}>
      <PiGearFineBold style={{ transform: "rotate(180deg)" }} />
    </button>
  );
}
