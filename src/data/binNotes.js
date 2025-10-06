function addMinutes(date, minutes = 1) {
  const copy = new Date(date);
  copy.setMinutes(copy.getMinutes() + minutes);
  return copy;
}

export const BIN_NOTES = [
  {
    id: 101,
    title: "Список покупок",
    body: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "Купить продукты: молоко, хлеб, яйца, сыр. Заодно взять кофе и овощи для салата.",
                type: "text",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "root",
        version: 1,
      },
    },
    isPinned: false,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
    deleteDate: addMinutes(new Date()).toISOString(),
  },
  {
    id: 102,
    title: "Идеи для путешествий",
    body: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "Хочу посетить: Тбилиси, Рим, Токио. Рассмотреть поездку на Байкал летом.",
                type: "text",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "root",
        version: 1,
      },
    },
    isPinned: false,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
    deleteDate: addMinutes(new Date()).toISOString(),
  },
  {
    id: 103,
    title: "Идеи для статей",
    body: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: "normal",
                style: "",
                text: "Темы: искусственный интеллект в образовании, минимализм в быту, заметки о продуктивности.",
                type: "text",
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            type: "paragraph",
            version: 1,
          },
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "root",
        version: 1,
      },
    },
    isPinned: false,
    createdAt: new Date().toISOString(),
    editedAt: new Date().toISOString(),
    deleteDate: addMinutes(new Date()).toISOString(),
  },
];
