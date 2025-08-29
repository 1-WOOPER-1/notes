import { Notes } from "@/pages/Notes.jsx";
import { Archive } from "@/pages/Archive.jsx";

export const privateRoutes = [
  {
    path: "/notes",
    element: Notes,
    exact: true,
  },
  {
    path: "/notes/:noteId",
    element: Notes,
    exact: true,
  },
  {
    path: "/archive",
    element: Archive,
    exact: true,
  },
  {
    path: "/archive/:noteId",
    element: Archive,
    exact: true,
  },
];
