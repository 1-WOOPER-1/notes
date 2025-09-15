import { useState } from "react";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { motion, AnimatePresence } from "framer-motion";
import { NoteCard } from "@components/NoteCard/NoteCard.jsx";
import styles from "./NotesContainer.module.scss";

export function NotesContainer({ notes, reorderNotes, listView }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 30 } })
  );

  const [activeId, setActiveId] = useState(null);
  const [overId, setOverId] = useState(null);

  function handleDragStart({ active }) {
    setActiveId(active.id);
  }

  function handleDragEnd({ active, over }) {
    if (over && active.id !== over.id) {
      reorderNotes((notes) => {
        const oldIndex = notes.findIndex((n) => n.id === active.id);
        const newIndex = notes.findIndex((n) => n.id === over.id);
        return arrayMove(notes, oldIndex, newIndex);
      });
    }
    setActiveId(null);
    setOverId(null);
  }

  function handleDragOver({ active, over }) {
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
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
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
        {activeId ? (
          <NoteCard note={notes.find((n) => n.id === activeId)} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
