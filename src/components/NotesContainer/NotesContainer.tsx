import { useState, Dispatch, SetStateAction } from "react";
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
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { motion, AnimatePresence } from "framer-motion";
import { NoteCard } from "@components/NoteCard/NoteCard";
import styles from "./NotesContainer.module.scss";
import { useUI } from "@/context/UIContext";
import { Note } from "@/types/note";

interface NotesContainerType {
  notes: Note[];
  setNotes?: Dispatch<SetStateAction<Note[]>>;
}

export function NotesContainer({ notes, setNotes }: NotesContainerType) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 30 } }),
  );

  const [activeId, setActiveId] = useState<string | number | null>(null);
  const [overId, setOverId] = useState<string | number | null>(null);
  const { listView } = useUI();
  const activeNote = notes.find((n) => n.id === activeId);

  function handleDragStart({ active }: DragStartEvent) {
    console.log("Drag started:", active);
    setActiveId(active.id);
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (over && active.id !== over.id && setNotes) {
      setNotes((notes) => {
        const oldIndex = notes.findIndex((n) => n.id === active.id);
        const newIndex = notes.findIndex((n) => n.id === over.id);
        return arrayMove(notes, oldIndex, newIndex);
      });
    }
    setActiveId(null);
    setOverId(null);
  }

  function handleDragOver({ active, over }: DragOverEvent) {
    setOverId(over && over.id !== active.id ? over.id : null);
  }

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
              <motion.div
                key={note.id}
                layoutId={String(note.id)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "tween",
                  duration: 0.35,
                  ease: "easeInOut",
                }}
              >
                <NoteCard
                  note={note}
                  isOver={note.id === overId}
                  isDragging={note.id === activeId}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </SortableContext>
      <DragOverlay dropAnimation={null}>
        {activeNote ? <NoteCard note={activeNote} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
