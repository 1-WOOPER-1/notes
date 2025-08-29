export function getBasePath(pathname) {
  const segments = pathname.split("/").filter((s) => s);
  segments.pop();
  const basePath = "/" + segments.join("/");
  return basePath;
}
