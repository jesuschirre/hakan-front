import { Outlet } from "react-router-dom";
import SidebarClient from "./SidebarClient";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      {/*Sidebar*/}
      <SidebarClient/>
      
      {/* contenido dinámico */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>

    </div>
  );
}