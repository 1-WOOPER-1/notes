import { useState, useCallback, useMemo, memo } from "react";
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
import { AnimatePresence } from "motion/react";
import { NoteCard } from "@components/NoteCard/NoteCard";
import styles from "./NotesContainer.module.scss";
import { Note } from "@/types/note";
import { SortableNoteCard } from "../NoteCard/SortableNoteCard";
import { useUIStore } from "@/stores/useUIStore";
import { useNotesStore } from "@/stores/useNotesStore";

interface NotesContainerType {
  notes: Note[];
  category?: "notes" | "archivedNotes" | "binNotes" | null;
}

export const NotesContainer = memo(function NotesContainer({
  notes,
  category,
}: NotesContainerType) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 30 } }),
  );

  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const listView = useUIStore((state) => state.listView);
  const reorderNotes = useNotesStore((state) => state.reorderNotes);
  const activeNote = useMemo(
    () => notes.find((n) => n.id === activeId),
    [notes, activeId],
  );

  const handleDragStart = useCallback(({ active }: DragStartEvent) => {
    setActiveId(String(active.id));
  }, []);

  const handleDragEnd = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (over && active.id !== over.id && category) {
        reorderNotes(category, String(active.id), String(over.id));
      }
      setActiveId(null);
      setOverId(null);
    },
    [category],
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
