import React from "react";
import HeaderUsuario from "./HeaderUsuario";
import SidebarUser from "./SidebarUser";

function TrabajosUser() {
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
          <div className="bg-gray-800 p-6 rounded-lg">
            <h1 className="text-2xl font-bold">Trabajos Disponibles</h1>
            <p className="mt-4">
              Aquí puedes ver todos los trabajos disponibles. Utiliza la barra lateral para navegar entre otras secciones.
            </p>
            {/* Espacio para la funcionalidad de trabajos */}
            <div className="mt-6">
              {/* Aquí puedes agregar la funcionalidad de trabajos como tablas, filtros, etc. */}
              <p className="text-gray-400">Funcionalidad pendiente de implementar.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TrabajosUser;
