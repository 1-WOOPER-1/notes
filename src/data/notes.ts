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

export const NOTES: Note[] = [
  {
    id: "1",
    title: "Список покупок",
    body: createBody(
      "Купить молоко, яйца, хлеб, сыр и фрукты. Проверить акции в магазине возле дома.",
    ),
    isPinned: true,
    createdAt: new Date(2024).toISOString(),
    editedAt: new Date(2024).toISOString(),
  },
  {
    id: "2",
    title: "Идеи для проекта",
    body: createBody(
      "Создать веб-приложение для планирования задач с таймером Помодоро и аналитикой продуктивности.",
    ),
    isPinned: false,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Планы на отпуск",
    body: createBody(
      "Забронировать билеты в Санкт-Петербург, найти жильё возле центра, составить список музеев и ресторанов.",
    ),
    isPinned: true,
    createdAt: new Date(2025, 9).toISOString(),
    editedAt: new Date(2025, 9).toISOString(),
  },
  {
    id: "4",
    title: "Книга к прочтению",
    body: createBody(
      "«Чайка по имени Джонатан Ливингстон» — история о свободе, мечтах и поиске смысла жизни.",
    ),
    isPinned: false,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Тренировка",
    body: createBody(
      "Понедельник — бег 5 км, среда — силовая тренировка, пятница — йога и растяжка.",
    ),
    isPinned: false,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Кулинарный эксперимент",
    body: createBody(
      "Попробовать приготовить пасту с соусом песто из шпината и кешью вместо базилика и кедровых орехов.",
    ),
    isPinned: false,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  },
  {
    id: "7",
    title: "Список фильмов",
    body: createBody(
      "«Интерстеллар», «Начало», «Паразиты», «Остров проклятых» и «Грань будущего».",
    ),
    isPinned: false,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  },
  {
    id: "8",
    title: "Рецепт смузи",
    body: createBody(
      "Банан, клубника, овсяное молоко, семена чиа и ложка мёда. Взбить в блендере до однородности.",
    ),
    isPinned: false,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  },
  {
    id: "9",
    title: "Учебные планы",
    body: createBody(
      "Изучить основы TypeScript, пройти курс по React Hooks, попробовать написать небольшое приложение на Next.js.",
    ),
    isPinned: true,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  },
  {
    id: "10",
    title: "День рождения друга",
    body: createBody(
      "Купить подарок — книга по фотографии. Забронировать столик в ресторане на 19:00.",
    ),
    isPinned: false,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  },
  {
    id: "11",
    title: "Погода на неделю",
    body: createBody(
      "Понедельник: дождь, вторник: солнечно, среда: облачно, четверг: гроза, пятница: ясно.",
    ),
    isPinned: false,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  },
  {
    id: "12",
    title: "Список дел на выходные",
    body: createBody(
      "Убраться дома, вымыть окна, сходить в парк, встретиться с друзьями, приготовить что-то новое.",
    ),
    isPinned: false,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  },
  {
    id: "13",
    title: "Цели на месяц",
    body: createBody(
      "Прочитать 2 книги, пробежать 50 км, изучить базовую анимацию в CSS, улучшить навыки в английском.",
    ),
    isPinned: true,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  },
  {
    id: "14",
    title: "Музыкальные треки",
    body: createBody(
      "Найти новые песни для плейлиста: лоу-фай для работы, джаз для вечера, электроника для бега.",
    ),
    isPinned: false,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  },
  {
    id: "15",
    title: "Покупка техники",
    body: createBody(
      "Выбрать новый монитор 27'' с 144 Гц, изучить обзоры и сравнить цены.",
    ),
    isPinned: false,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  },
  {
    id: "16",
    title: "Планы по ремонту",
    body: createBody(
      "Перекрасить стены в спальне, купить новую лампу, заменить шторы.",
    ),
    isPinned: false,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  },
  {
    id: "17",
    title: "Заметки по книге",
    body: createBody(
      "Основная мысль: важно фокусироваться на процессе, а не только на результате. Ценить путь.",
    ),
    isPinned: false,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  },
  {
    id: "18",
    title: "Идеи для блога",
    body: createBody(
      "Написать статью о продуктивности, сделать обзор любимых приложений, поделиться рецептом завтрака.",
    ),
    isPinned: false,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  },
  {
    id: "19",
    title: "Садовые работы",
    body: createBody(
      "Посадить розы и лаванду, прополоть грядки, установить капельный полив.",
    ),
    isPinned: false,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  },
  {
    id: "20",
    title: "Финансовые цели",
    body: createBody(
      "Отложить 10% от дохода, инвестировать в ETF, изучить криптовалюты.",
    ),
    isPinned: true,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
  },
];
