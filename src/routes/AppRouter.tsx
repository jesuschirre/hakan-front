import { Routes, Route } from "react-router-dom";
import PanelRoute from "./PanelRoute";

// vistas públicas
import Enter_ap from "../pages/Enter_ap";
import LoginCli from "../pages/clientes/auth/LoginCli";
import RegisterCli from "../pages/clientes/auth/RegisterCli";
import MainPage from "../pages/clientes/MainPage";

// cliente
import DashboardLayout from "../pages/clientes/panel_client/pages/DashboardLayout";
import DashboardClient from "../pages/clientes/panel_client/pages/DashboardClient";
import Profile from "../pages/clientes/panel_client/pages/Profile";
import SoliTec from "../pages/clientes/panel_client/pages/SoliTec";
import SoliRealtime from "../pages/clientes/panel_client/pages/SoliRealtime";
import PagosCl from "../pages/clientes/panel_client/pages/PagosCl";
import Calification from "../pages/clientes/panel_client/pages/Calification";

// empresa
import LoginEm from "../pages/empresa_afiliada/auth/LoginEm";

// rubro
import LoginHakan from "../pages/empresa_hakan/auth/LoginHakan";
import DashLotoutRubro from "../pages/empresa_hakan/panel_Hakan/pages/DashLotoutRubro";
import DashRubro from "../pages/empresa_hakan/panel_Hakan/pages/DashRubro";
import ConfiguracionRu from "../pages/empresa_hakan/panel_Hakan/pages/ConfiguracionRu";

// errores
import Error403 from "../components/error403";
import Error404 from "../components/error404";

export default function AppRouter() {
  return (
    <Routes>
      {/* 🌍 PUBLIC */}
      <Route path="/" element={<Enter_ap />} />
      <Route path="/client/login" element={<LoginCli />} />
      <Route path="/client/register" element={<RegisterCli />} />
      <Route path="/client/main" element={<MainPage />} />

      <Route path="/company/login" element={<LoginEm />} />
      <Route path="/rubro/login" element={<LoginHakan />} />

      {/* 🔐 PROTEGIDO */}
        
        {/* 🧑‍💼 CLIENT PANEL */}
        <Route element={<PanelRoute panel="client" />}>
          <Route path="/client/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardClient />} />
            <Route path="profile" element={<Profile />} />
            <Route path="solicitud" element={<SoliTec />} />
            <Route path="solicitud_Seguimiento" element={<SoliRealtime />} />
            <Route path="pagos" element={<PagosCl />} />
            <Route path="calificacion" element={<Calification />} />
          </Route>
        </Route>

        {/* 🧩 RUBRO PANEL */}
        <Route >
          <Route path="/rubro/dashboard" element={<DashLotoutRubro />}>
            <Route index element={<DashRubro />} />
            <Route path="configuracion" element={<ConfiguracionRu />} />
          </Route>
        </Route>

      {/* 🚫 ERRORES */}
      <Route path="/403" element={<Error403 />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}
