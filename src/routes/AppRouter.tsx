import { Routes, Route } from "react-router-dom";
// importar vista de entrada a la app
import Enter_ap from "../pages/Enter_ap";
// importar vistas de cliente
import LoginCli from "../pages/clientes/auth/LoginCli";
import RegisterCli from "../pages/clientes/auth/RegisterCli";
import MainPage from "../pages/clientes/MainPage";
 //panel de control del cliente
import DashboardLayout from "../pages/clientes/panel_client/pages/DashboardLayout";
import DashboardClient from "../pages/clientes/panel_client/pages/DashboardClient";
import Profile from "../pages/clientes/panel_client/pages/Profile";
//importar vistas de empresa
import LoginEm from "../pages/empresa_afiliada/auth/LoginEm";
// importar vistas de Hakan
import LoginHakan from "../pages/empresa_hakan/auth/LoginHakan";

export default function AppRouter() {
  return (
    <Routes>
      {/* entrar a la app */}
      <Route path="/" element= {<Enter_ap/>}/>

      {/*vistas de cliente */}
      <Route path="/client/login" element={<LoginCli />} />
      <Route path="/client/register" element= {<RegisterCli/>}/>
      <Route path="/client/main" element= {<MainPage/>}/>
      {/* rutas cliente: PANEL */}
       <Route path="/client/dashboard" element={<DashboardLayout/>}>
          <Route index element={<DashboardClient/>}/>
          <Route path="profile" element={<Profile/>} />
       </Route>

      {/*vistas de empresa */}
      <Route path="/company/login" element={<LoginEm/>}/>

      {/*vistas de Hakan */}
      <Route path="/hakan/login" element={<LoginHakan/>}/>   

    </Routes>
  );
}