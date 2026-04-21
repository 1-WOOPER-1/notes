import { TbLayoutList, TbLayoutGrid } from "react-icons/tb";
import { Button } from "@components/UI/Button/Button";
import { useUIStore } from "@/stores/useUIStore";

interface ToggleViewButtonProps {
  className?: string;
  showLabel?: boolean;
}

export function ToggleViewButton({
  className,
  showLabel,
}: ToggleViewButtonProps) {
  const listView = useUIStore((state) => state.listView);
  const toggleView = useUIStore((state) => state.toggleView);

  return (
    <Button
      className={className}
      onClick={toggleView}
      toolTipText={showLabel ? undefined : listView ? "Grid view" : "List view"}
    >
      {!listView ? <TbLayoutList /> : <TbLayoutGrid />}
      {showLabel && <span>{listView ? "Grid view" : "List view"}</span>}
    </Button>
  );
}
