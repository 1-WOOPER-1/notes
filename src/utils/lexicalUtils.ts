import { SerializedEditorState, SerializedLexicalNode } from "lexical";

export function lexicalToPlainText(lexical: SerializedEditorState): string {
  function extractText(
    node: SerializedLexicalNode & {
      children?: SerializedLexicalNode[];
      text?: string;
    },
  ): string {
    return node.children
      ? node.children.map((part) => extractText(part)).join("\n")
      : (node.text ?? "");
  }
  return extractText(lexical.root as SerializedLexicalNode);
}
