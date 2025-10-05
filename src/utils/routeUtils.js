export function getBasePath(pathname) {
  const segments = pathname
    .replace(/\/&/, "")
    .split("/")
    .filter((s) => s);
  segments.pop();
  const basePath = "/" + segments.join("/");
  return basePath;
}

export function joinPaths(...paths) {
  return (
    "/" +
    paths
      .map((p) => p.replace(/^\/|\/&/g, ""))
      .filter((p) => p)
      .join("/")
  );
}
