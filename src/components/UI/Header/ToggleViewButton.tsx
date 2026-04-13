import { TbLayoutList, TbLayoutGrid } from "react-icons/tb";
import { Button } from "@components/UI/Button/Button";
import styles from "./Header.module.scss";
import { useUI } from "@/context/UIContext";

export function ToggleViewButton() {
  const { listView, toggleView } = useUI();

  return (
    <Button
      className={styles.headerBtn}
      onClick={toggleView}
      toolTipText={listView ? "Grid view" : "List view"}
    >
      {!listView ? <TbLayoutList /> : <TbLayoutGrid />}
    </Button>
  );
}
