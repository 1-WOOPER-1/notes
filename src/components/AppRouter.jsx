import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutes } from "@/router/routes.js";

export function AppRouter() {
  return (
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          Component={route.element}
          exact={route.exact}
        />
      ))}
      <Route path="*" element={<Navigate to="/notes" />} />
    </Routes>
  );
}
