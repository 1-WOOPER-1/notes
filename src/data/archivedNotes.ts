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

export const ARCHIVED_NOTES: Note[] = [
  {
    id: "21",
    title: "Фильмы к просмотру",
    body: createBody(
      "Посмотреть новые фильмы: 'Оппенгеймер', 'Дюна 2', 'Киллеры цветочной луны'. Добавить классические — 'Интерстеллар', 'Начало'.",
    ),
    isPinned: false,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  },
  {
    id: "22",
    title: "Тренировки на неделю",
    body: createBody(
      "Понедельник — бег 5 км, среда — силовые упражнения, пятница — йога, воскресенье — плавание.",
    ),
    isPinned: false,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  },
  {
    id: "23",
    title: "Учебный план",
    body: createBody(
      "Прочитать главы по React и TypeScript, пройти курс по алгоритмам, закрепить основы Docker.",
    ),
    isPinned: false,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  },
  {
    id: "24",
    title: "Список подарков",
    body: createBody(
      "Купить книгу для Анны, наушники для Ивана, настольную игру для друзей.",
    ),
    isPinned: false,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  },
];
