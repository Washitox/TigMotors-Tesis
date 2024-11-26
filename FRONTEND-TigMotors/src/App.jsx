import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingView from "./views/public/Landing/LandingView";
import PrivateRoute from "./routes/PrivateRoute";
import LoginView from "./views/public/Login/LoginView";
import RegisterView from "./views/public/Register/RegisterView";
import RecuperarContraseñaView from "./views/public/RecuperarContraseña/RecuperarContraseñaView";
import Layout from "./views/public/Layout";
import EdnpointNoEncontradoView from "./views/public/Endpoint no encontrado/EdnpointNoEncontradoView";
import NuevaContraseñaView from "./views/public/Nueva Contraseña/NuevaContraseñaView";
import LayoutCierre from "./views/private/LayoutCierre";
import DashboardAdminView from "./views/private/Dashboard-ADMIN/DashboardAdminView";
import DashboardPersonalView from "./views/private/Dashboard-PERSONAL_CENTRO_DE_SERVICIOS/DashboardPersonalView";
import DashboardUserView from "./views/private/Dashboard-USER/DashboardUserView";
import PaginaNoAutorizadaView from "./views/public/Pagina no Autorizada/PaginaNoAutorizadaView";
import Trabajos from "./views/private/Dashboard-ADMIN/ui/Trabajos";
import Usuarios from "./views/private/Dashboard-ADMIN/ui/Usuarios";
import SolicitudesTrabajo from "./views/private/Dashboard-ADMIN/ui/SolicitudesTrabajo";
import SolicitudesRegistro from "./views/private/Dashboard-ADMIN/ui/SolicitudesRegistro";
import RegistrarUsuario from "./views/private/Dashboard-ADMIN/ui/RegistrarUsuario";
import RegistrarTrabajo from "./views/private/Dashboard-ADMIN/ui/RegistrarTrabajo";
import Perfil from "./views/private/Dashboard-ADMIN/ui/Perfil";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<LandingView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/reset-password" element={<RecuperarContraseñaView />} />
          <Route path="/new-password" element={<NuevaContraseñaView />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<LayoutCierre />}>
            <Route element={<PrivateRoute allowedRoles={["ADMIN"]} />}>
              <Route path="/admin/" element={<DashboardAdminView />} />
              <Route path="/admin/trabajos" element={<Trabajos />} />
              <Route path="/admin/usuarios" element={<Usuarios />} />
              <Route path="/admin/solicitudes-trabajo" element={<SolicitudesTrabajo />} />
              <Route path="/admin/solicitudes-registro" element={<SolicitudesRegistro />} />
              <Route path="/admin/registrar-usuario" element={<RegistrarUsuario />} />
              <Route path="/admin/registrar-trabajo" element={<RegistrarTrabajo />} />
              <Route path="/admin/perfil" element={<Perfil />} />
            </Route>
            <Route element={<PrivateRoute allowedRoles={["PERSONAL_CENTRO_DE_SERVICIOS"]} />}>
              <Route path="/personal/" element={<DashboardPersonalView />} />
            </Route>
            <Route element={<PrivateRoute allowedRoles={["USER"]} />}>
              <Route path="/user/" element={<DashboardUserView />} />
            </Route>
          </Route>


        </Route>


        <Route path="*" element={<EdnpointNoEncontradoView />} />
        <Route path="/unauthorized" element={<PaginaNoAutorizadaView />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
