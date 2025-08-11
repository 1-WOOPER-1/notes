import { PiGearFineBold } from "react-icons/pi";
import styles from "./SettingsBtn.module.scss";

export function SettingsBtn() {
  return (
    <button className={styles.settingsBtn}>
      <PiGearFineBold style={{ transform: "rotate(180deg)" }} />
    </button>
  );
}
