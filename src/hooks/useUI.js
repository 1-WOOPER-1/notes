import { useContext } from "react";
import { UIContext } from "@/context/UIContext.js";

export function useUI() {
  return useContext(UIContext);
}
