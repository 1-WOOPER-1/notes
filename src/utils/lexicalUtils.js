export function lexicalToPlainText(lexical) {
  function extractText(node, sep = "") {
    return node.children
      ? node.children.map((part) => extractText(part)).join(sep)
      : node.text;
  }

  return extractText(lexical.root, "\n");
}
