import { Navigate } from "react-router-dom";
import { Notes } from "@/pages/Notes";
import { Archive } from "@/pages/Archive";
import { Bin } from "@/pages/Bin";
import { Layout } from "@/pages/Layout";

export const routerConfig = [
  {
    path: "/",
    element: <Layout />,

    children: [
      {
        index: true,
        element: <Navigate to="notes" replace />,
        handle: { filter: "notes" },
      },
      {
        path: "notes",
        element: <Notes />,
        exact: true,
        handle: { filter: "notes" },

        children: [
          {
            path: ":noteId",
            element: <Notes />,
            exact: true,
            handle: { filter: "notes" },
          },
        ],
      },
      {
        path: "archive",
        element: <Archive />,
        exact: true,
        handle: { filter: "archive" },
        children: [
          {
            path: ":noteId",
            element: <Archive />,
            exact: true,
            handle: { filter: "archive" },
          },
        ],
      },
      {
        path: "bin",
        element: <Bin />,
        exact: true,
        handle: { filter: "bin" },
        children: [
          {
            path: ":noteId",
            element: <Bin />,
            exact: true,
            handle: { filter: "bin" },
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to="notes" replace />,
      },
    ],
  },
];
