import { Sidebar } from "@components/UI/Sidebar/Sidebar";
import { Header } from "@components/UI/Header/Header";
import { Outlet } from "react-router-dom";
import styles from "@/App.module.scss";

export function Layout() {
  return (
    <>
      <Header />
      <div className={styles.layout}>
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}
