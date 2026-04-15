import { Sidebar } from "@components/UI/Sidebar/Sidebar";
import { Header } from "@components/UI/Header/Header";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
    </>
  );
}
