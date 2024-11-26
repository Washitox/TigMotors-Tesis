import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./ui/sidebar";
import HeaderAdmin from "./ui/HeaderAdmin";
import Trabajos from "./ui/Trabajos";
import Usuarios from "./ui/Usuarios";
import SolicitudesTrabajo from "./ui/SolicitudesTrabajo";
import SolicitudesRegistro from "./ui/SolicitudesRegistro";
import RegistrarUsuario from "./ui/RegistrarUsuario";
import RegistrarTrabajo from "./ui/RegistrarTrabajo";
import Perfil from "./ui/Perfil";


export default function DashboardAdminView() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <HeaderAdmin />

        {/* Dynamic Content using Routes */}
        <main className="p-6 overflow-y-auto">
          <Routes>
            {/* Wrapper for Topbar */}
            <Route
              element={
                <>
                  <Sidebar />
                </>
              }
            >
              {/* Subroutes */}
              <Route path="/admin/trabajos" element={<Trabajos />} />
              <Route path="/admin/usuarios" element={<Usuarios />} />
              <Route path="/admin/solicitudes-trabajo" element={<SolicitudesTrabajo />} />
              <Route path="/admin/solicitudes-registro" element={<SolicitudesRegistro />} />
              <Route path="/admin/registrar-usuario" element={<RegistrarUsuario />} />
              <Route path="/admin/registrar-trabajo" element={<RegistrarTrabajo />} />
              <Route path="/admin/perfil" element={<Perfil />} />
            </Route>
          </Routes>
        </main>
      </div>
    </div>
  );
}
