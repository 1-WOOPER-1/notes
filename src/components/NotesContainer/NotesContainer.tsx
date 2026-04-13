import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  memo,
} from "react";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { AnimatePresence } from "framer-motion";
import { NoteCard } from "@components/NoteCard/NoteCard";
import styles from "./NotesContainer.module.scss";
import { useUI } from "@/context/UIContext";
import { useNotes } from "@/context/NotesContext";
import { Note } from "@/types/note";
import { SortableNoteCard } from "../NoteCard/SortableNoteCard";

interface NotesContainerType {
  notes: Note[];
  setNotes?: Dispatch<SetStateAction<Note[]>>;
}

export const NotesContainer = memo(function NotesContainer({
  notes,
  setNotes,
}: NotesContainerType) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 30 } }),
  );

  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const { listView } = useUI();
  const { reorderNotes } = useNotes();
  const activeNote = useMemo(
    () => notes.find((n) => n.id === activeId),
    [notes, activeId],
  );

  const handleDragStart = useCallback(({ active }: DragStartEvent) => {
    setActiveId(String(active.id));
  }, []);

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (over && active.id !== over.id && setNotes) {
        reorderNotes(setNotes, String(active.id), String(over.id));
      }
      setActiveId(null);
      setOverId(null);
    },
    [setNotes],
  );

  const handleDragOver = useCallback(({ active, over }: DragOverEvent) => {
    setOverId(over && over.id !== active.id ? String(over.id) : null);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={notes} strategy={rectSortingStrategy}>
        <div
          className={`${styles.notesContainer} ${
            listView ? styles.listView : ""
          }`}
        >
          <AnimatePresence>
            {notes.map((note) => (
              <SortableNoteCard
                key={note.id}
                note={note}
                isOver={note.id === overId}
                isDragging={note.id === activeId}
              />
            ))}
          </AnimatePresence>
        </div>
      </SortableContext>
      <DragOverlay dropAnimation={null}>
        {activeNote ? <NoteCard note={activeNote} /> : null}
      </DragOverlay>
    </DndContext>
  );
});
