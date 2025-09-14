import styles from "../Lexical.module.scss";

export const editorTheme = {
  code: styles.editorCode,
  heading: {
    h1: styles.editorHeadingH1,
    h2: styles.editorHeadingH2,
    h3: styles.editorHeadingH3,
    h4: styles.editorHeadingH4,
    h5: styles.editorHeadingH5,
    h6: styles.editorHeadingH6,
  },
  image: styles.editorImage,
  link: styles.editorLink,
  list: {
    listItem: styles.editorListItem,
    nested: {
      listItem: styles.editorNestedListItem,
    },
    ol: styles.editorListOl,
    ul: styles.editorListUl,
  },
  paragraph: styles.editorParagraph,
  placeholder: styles.editorPlaceholder,
  quote: styles.editorQuote,
  text: {
    bold: styles.editorTextBold,
    code: styles.editorTextCode,
    hashtag: styles.editorTextHashtag,
    italic: styles.editorTextItalic,
    overflowed: styles.editorTextOverflowed,
    strikethrough: styles.editorTextStrikethrough,
    underline: styles.editorTextUnderline,
    underlineStrikethrough: styles.editorTextUnderlineStrikethrough,
  },
};
