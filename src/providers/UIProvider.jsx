import { useState } from "react";
import { UIContext } from "@/context/UIContext.js";
import { LocalStorageService } from "@/utils/localStorage.js";

export function UIProvider({ children }) {
  const [query, setQuery] = useState("");
  const [listView, setlistView] = useState(
    LocalStorageService.getItem("listView") || false
  );
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  return (
    <UIContext.Provider
      value={{
        query,
        setQuery,
        listView,
        setlistView,
        isEditorOpen,
        setIsEditorOpen,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}
