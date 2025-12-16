import { Outlet, Link, useLocation } from "react-router-dom";
import { useState } from "react";
// Importamos iconos más modernos y variados
import { FaRegMoon, FaHome, FaUser } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";
import { HiMenuAlt2, HiX } from "react-icons/hi"; // Iconos para menú hamburguesa
import { RiDashboardFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../../../hooks/useAuth";
export default function DashboardLayout() {
  const location = useLocation(); // Hook para saber en qué ruta estamos
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const {usuario} = useAuth();
  // Agregamos iconos a los datos
  const vistas = [
    { name: "Inicio", path: "/client/dashboard", icon: <FaHome /> },
    { name: "Perfil", path: "/client/dashboard/profile", icon: <FaUser /> },
  ];

  return (
    // Contenedor principal: gestiona la clase 'dark' para todo el layout
    <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${darkMode ? "dark bg-slate-900" : ""}`}>
      
      {/* OVERLAY MOBILE: Fondo oscuro cuando el menú está abierto en móvil */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 
          bg-white dark:bg-slate-800 border-r dark:border-slate-700
          shadow-2xl lg:shadow-none
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static 
          flex flex-col
        `}
      >
        {/* Logo Area */}
        <div className="h-20 flex items-center justify-between px-6 border-b dark:border-slate-700">
          <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400">
             <RiDashboardFill className="text-3xl" />
             <span className="text-2xl font-bold tracking-tight">HAKAN</span>
          </div>
          <button 
            className="lg:hidden p-2 text-slate-500 hover:text-red-500 transition-colors" 
            onClick={() => setSidebarOpen(false)}
          >
            <HiX className="text-2xl" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {vistas.map((vista) => {
            // Verificamos si la ruta actual coincide con el link
            const isActive = location.pathname === vista.path;
            
            return (
              <Link
                key={vista.name}
                to={vista.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? "bg-soft text-white shadow-md shadow-indigo-200 dark:shadow-none" 
                    : "text-black dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-warning dark:hover:text-white"
                  }
                `}
              >
                <span className={`text-lg ${isActive ? "text-white" : "text-slate-400 group-hover:text-warning dark:group-hover:text-white"}`}>
                    {vista.icon}
                </span>
                <span className="font-medium">{vista.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Sidebar (Opcional) */}
        <div className="p-4 text-xs text-center text-slate-400 dark:text-slate-600 border-t dark:border-slate-700">
              <button
                className="
                  flex items-center gap-2
                  px-4 py-2
                  w-full
                  text-sm font-medium
                  text-red-600
                  bg-red-50
                  rounded-xl
                  transition-all duration-200
                  hover:bg-red-100
                  hover:text-red-700
                  active:scale-95
                "
              >
                <FiLogOut className="text-lg" />
                Cerrar sesión
              </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex flex-col flex-1 min-w-0"> {/* min-w-0 evita overflow en flex children */}
        
        {/* HEADER */}
        <header className="h-20 bg-white dark:bg-slate-800 border-b dark:border-slate-700 flex items-center justify-between px-4 lg:px-8 transition-colors duration-300">
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 text-slate-600 dark:text-slate-200 lg:hidden hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <HiMenuAlt2 className="text-2xl" />
            </button>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white hidden sm:block">
              Bienvenido de nuevo
            </h1>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            
            {/* Dark Mode Toggle - Diseño Switch Moderno */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="relative p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 transition-all duration-300"
              aria-label="Toggle Dark Mode"
            >
               <div className="text-xl transform transition-transform duration-500 hover:rotate-12">
                 {darkMode ? <IoMdSunny className="text-yellow-400" /> : <FaRegMoon className="text-indigo-600" />}
               </div>
            </button>

            {/* Separador vertical */}
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>

            {/* User Profile */}
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-none">{usuario?.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Admin</p>
              </div>
              <img
                src={usuario?.avatar} // Imagen de mayor calidad
                alt="Avatar"
                className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-slate-600 object-cover shadow-sm"
              />
            </div>
          </div>
        </header>

        {/* CONTENIDO DINÁMICO (Outlet) */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-slate-50 dark:bg-slate-900 scroll-smooth">
          <div className=" mx-auto animate-fadeIn">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
}