import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import styles from "./NotesContainer.module.scss";
import { NoteCard } from "@components/NoteCard/NoteCard.jsx";

export function NotesContainer({ notes, reorderNotes, listView }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 30 } })
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      reorderNotes((notes) => {
        let oldIndex, newIndex;
        for (let ind = 0; ind < notes.length; ind++) {
          if (active.id === notes[ind].id) oldIndex = ind;
          if (over.id === notes[ind].id) newIndex = ind;
        }
        return arrayMove(notes, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={notes} strategy={rectSortingStrategy}>
        <div
          className={`${styles.notesContainer} ${
            listView ? styles.listView : ""
          }`}
        >
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
