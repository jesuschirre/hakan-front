import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function DashboardLockGuard() {
  const { usuario } = useAuth();
  const location = useLocation();

  // Si NO está logueado → navegación normal
  if (!usuario) {
    return <Outlet />;
  }

  // Detectar si está en algún dashboard
  const isInDashboard =
    location.pathname.startsWith("/client/dashboard") ||
    location.pathname.startsWith("/rubro/dashboard") ||
    location.pathname.startsWith("/company/dashboard");

  // Rutas públicas
  const publicRoutes = [
    "/",
    "/client/login",
    "/client/register",
    "/client/main",
    "/company/login",
    "/rubro/login",
  ];

  // 🚫 Logueado + intenta ir a ruta pública
  if (publicRoutes.includes(location.pathname)) {
    // 👉 NO retrocede porque usamos replace
    return <Navigate to={getCurrentDashboard()} replace />;
  }

  // 🚫 Logueado + está en dashboard → no dejar salir
  if (!isInDashboard) {
    return <Navigate to={getCurrentDashboard()} replace />;
  }

  return <Outlet />;
}

// 🔧 Helper simple (sin panels ni activePanel)
function getCurrentDashboard() {
  // esto es suficiente por ahora
  if (window.location.pathname.startsWith("/rubro")) {
    return "/rubro/dashboard";
  }
  if (window.location.pathname.startsWith("/company")) {
    return "/company/dashboard";
  }
  return "/client/dashboard";
}