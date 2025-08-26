import { Notes } from "@/pages/Notes.jsx";
import { Archive } from "@/pages/Archive.jsx";

export const privateRoutes = [
  {
    path: "/notes",
    element: Notes,
    exact: true,
  },
  {
    path: "/archive",
    element: Archive,
    exact: true,
  },
  {
    path: "*",
    element: "/notes",
    exact: true,
  },
];
