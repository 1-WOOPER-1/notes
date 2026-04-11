export function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function highlightTextInHTML(htmlString: string, search: string) {
  if (!search) return htmlString;

  const originalHtml = htmlString;
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, null);
  let node;
  let fullText = "";
  const textNodes = [];

  while ((node = walker.nextNode())) {
    const start = fullText.length;
    fullText += node.nodeValue;
    const end = fullText.length;
    textNodes.push({ node, start, end });
  }

  if (!fullText) return originalHtml;

  const saveSearch = escapeRegExp(search);
  const regex = new RegExp(saveSearch, "gi");
  const matches = [];
  let m;
  while ((m = regex.exec(fullText)) !== null) {
    matches.push({ start: m.index, end: m.index + m[0].length });
  }

  if (!matches.length) return originalHtml;

  const mask = new Uint8Array(fullText.length);
  matches.forEach(({ start, end }) => {
    mask.fill(1, start, end);
  });

  textNodes.forEach(({ node, start, end }) => {
    const parent = node.parentNode;
    if (!parent) return;

    const text = node.nodeValue ?? "";
    let idx = start;
    const frag = doc.createDocumentFragment();

    while (idx < end) {
      const isMarked = !!mask[idx];
      let j = idx + 1;
      while (j < end && !!mask[j] === isMarked) j++;

      const slice = text.slice(idx - start, j - start);

      if (isMarked) {
        const markEl = doc.createElement("mark");
        markEl.appendChild(doc.createTextNode(slice));
        frag.appendChild(markEl);
      } else {
        frag.appendChild(doc.createTextNode(slice));
      }

      idx = j;
    }

    parent.replaceChild(frag, node);
  });

  return doc.body.innerHTML;
}
