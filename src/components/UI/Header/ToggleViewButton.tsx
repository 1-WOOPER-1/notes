import { TbLayoutList, TbLayoutGrid } from "react-icons/tb";
import { Button } from "@components/UI/Button/Button";
import styles from "./Header.module.scss";
import { useUIStore } from "@/stores/useUIStore";

export function ToggleViewButton() {
  const listView = useUIStore((state) => state.listView);
  const toggleView = useUIStore((state) => state.toggleView);

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
