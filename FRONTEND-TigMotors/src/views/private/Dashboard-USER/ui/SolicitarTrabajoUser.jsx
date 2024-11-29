import React from "react";
import HeaderUsuario from "./HeaderUsuario";
import SidebarUser from "./SidebarUser";

function SolicitarTrabajoUser() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar del usuario */}
      <SidebarUser />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Header del usuario */}
        <HeaderUsuario />

        {/* Contenedor principal */}
        <main className="p-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Solicitar Trabajo</h1>
            <p className="text-gray-400">
              Aquí puedes solicitar un trabajo al administrador.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SolicitarTrabajoUser;
