import { createEditor } from "lexical";
import { ParagraphNode, TextNode } from "lexical";
import { CodeNode } from "@lexical/code";
import { QuoteNode, HeadingNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { $generateHtmlFromNodes } from "@lexical/html";

const editor = createEditor({
  nodes: [
    ParagraphNode,
    TextNode,
    CodeNode,
    QuoteNode,
    HeadingNode,
    ListNode,
    ListItemNode,
    LinkNode,
  ],
});

export function getHTMLFromBody(bodyState) {
  const editorState = editor.parseEditorState(bodyState);
  editor.setEditorState(editorState);

  let htmlString = "";
  editor.update(() => {
    htmlString = $generateHtmlFromNodes(editor);
  });
  return htmlString;
}
