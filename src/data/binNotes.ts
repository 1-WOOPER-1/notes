import { Note } from "@/types/note";
import { SerializedEditorState } from "lexical";

function createBody(text: string): SerializedEditorState {
  return {
    root: {
      type: "root",
      version: 1,
      direction: "ltr",
      format: "",
      indent: 0,
      children: [
        {
          type: "paragraph",
          version: 1,
          direction: "ltr",
          format: "",
          indent: 0,
          children: [
            {
              type: "text",
              version: 1,
              text,
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
            } as unknown as never,
          ],
        } as unknown as never,
      ],
    },
  } as unknown as SerializedEditorState;
}

function addMinutes(date: Date, minutes = 1) {
  const copy = new Date(date);
  copy.setMinutes(copy.getMinutes() + minutes);
  return copy;
}

export const BIN_NOTES: Note[] = [
  {
    id: "101",
    title: "Список покупок",
    body: createBody(
      "Купить продукты: молоко, хлеб, яйца, сыр. Заодно взять кофе и овощи для салата.",
    ),
    isPinned: false,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
    deleteDate: addMinutes(new Date()).toISOString(),
  },
  {
    id: "102",
    title: "Идеи для путешествий",
    body: createBody(
      "Хочу посетить: Тбилиси, Рим, Токио. Рассмотреть поездку на Байкал летом.",
    ),
    isPinned: false,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
    deleteDate: addMinutes(new Date()).toISOString(),
  },
  {
    id: "103",
    title: "Идеи для статей",
    body: createBody(
      "Темы: искусственный интеллект в образовании, минимализм в быту, заметки о продуктивности.",
    ),
    isPinned: false,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
    deleteDate: addMinutes(new Date()).toISOString(),
  },
];
