import React from "react";
import Sidebar from "./Sidebar";
import HeaderAdmin from "./HeaderAdmin";

function RegistrarTrabajo() {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar para la navegación */}
      <Sidebar />

      {/* Contenedor principal */}
      <div className="flex-1 flex flex-col">
        {/* Header superior */}
        <HeaderAdmin />

        {/* Contenido de la página */}
        <main className="p-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Registrar Trabajo</h1>
            <p className="text-gray-400">
              Aquí puedes registrar un nuevo trabajo en el sistema.
            </p>
            {/* Agrega el formulario aquí */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default RegistrarTrabajo;
