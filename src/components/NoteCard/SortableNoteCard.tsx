import { memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { NoteCard } from "./NoteCard";
import { Note, NoteCategory } from "@/types/note";

interface SortableNoteCardProps {
  note: Note;
  isOver: boolean;
  isDragging: boolean;
  category: NoteCategory;
}

export const SortableNoteCard = memo(function SortableNoteCard({
  note,
  isOver,
  isDragging,
  category,
}: SortableNoteCardProps) {
  const { attributes, listeners, setNodeRef } = useSortable({ id: note.id });

  const style = {
    scale: 1,
    transition: "opacity 0.2s ease",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <NoteCard
        note={note}
        isOver={isOver}
        isDragging={isDragging}
        category={category}
      />
    </div>
  );
});
