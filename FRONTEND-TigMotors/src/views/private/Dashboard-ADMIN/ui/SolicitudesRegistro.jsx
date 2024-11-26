import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./sidebar";
import HeaderAdmin from "./HeaderAdmin";

export default function DashboardAdminView() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState(10); // Número de filas a mostrar por página
  const [currentPage, setCurrentPage] = useState(1);

  // Obtener solicitudes pendientes desde el backend
  useEffect(() => {
    axios
      .get("http://localhost:8085/api/admin/users/pending")
      .then((response) => {
        setSolicitudes(response.data); // Asume que los datos están en `response.data`
      })
      .catch((error) => {
        console.error("Error al obtener solicitudes pendientes:", error);
      });
  }, []);

  // Filtrar solicitudes según el término de búsqueda
  const filteredSolicitudes = solicitudes.filter((solicitud) =>
    solicitud.usuario.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular solicitudes a mostrar en la página actual
  const indexOfLastEntry = currentPage * entries;
  const indexOfFirstEntry = indexOfLastEntry - entries;
  const currentSolicitudes = filteredSolicitudes.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const totalPages = Math.ceil(filteredSolicitudes.length / entries);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <HeaderAdmin />

        {/* Dynamic Content */}
        <main className="p-6 overflow-y-auto">
          <div className="bg-gray-800 p-6 rounded-lg text-white">
            <h1 className="text-2xl font-bold mb-4 text-center">
              Solicitudes de Registro
            </h1>

            {/* Controles superiores */}
            <div className="flex justify-between items-center mb-4">
              {/* Selección de número de filas */}
              <div>
                <label htmlFor="entries" className="mr-2">
                  Mostrar:
                </label>
                <select
                  id="entries"
                  className="bg-gray-700 text-white p-2 rounded"
                  value={entries}
                  onChange={(e) => setEntries(Number(e.target.value))}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
                <span className="ml-2">entradas</span>
              </div>

              {/* Búsqueda */}
              <div>
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="bg-gray-700 text-white p-2 rounded"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="p-3">ID</th>
                    <th className="p-3">Usuario</th>
                    <th className="p-3">Empresa</th>
                    <th className="p-3">Correo Electrónico</th>
                    <th className="p-3">Celular</th>
                    <th className="p-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSolicitudes.map((solicitud, index) => (
                    <tr
                      key={solicitud.id}
                      className={index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"}
                    >
                      <td className="p-3">{solicitud.id}</td>
                      <td className="p-3">{solicitud.usuario}</td>
                      <td className="p-3">{solicitud.empresa}</td>
                      <td className="p-3">{solicitud.correoElectronico}</td>
                      <td className="p-3">{solicitud.celular}</td>
                      <td className="p-3 flex space-x-2">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded">
                          Editar
                        </button>
                        <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded">
                          Aceptar
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded">
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <div className="flex justify-between items-center mt-4">
              <span>
                Mostrando {indexOfFirstEntry + 1} -{" "}
                {Math.min(indexOfLastEntry, filteredSolicitudes.length)} de{" "}
                {filteredSolicitudes.length} entradas
              </span>
              <div className="flex space-x-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded disabled:opacity-50"
                >
                  Anterior
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-1 px-3 rounded disabled:opacity-50"
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
