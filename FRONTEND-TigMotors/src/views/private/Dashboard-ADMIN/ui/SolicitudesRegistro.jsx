import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import HeaderAdmin from "./HeaderAdmin";

export default function SolicitudesRegistro() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingStates, setLoadingStates] = useState({});
  const [isFetching, setIsFetching] = useState(false);

  const getToken = () => localStorage.getItem("authToken");

  const fetchSolicitudes = async () => {
    try {
      setIsFetching(true);
      const token = getToken();
      const response = await axios.get("http://localhost:8085/api/admin/users/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSolicitudes(response.data);
    } catch (error) {
      console.error("Error al obtener solicitudes:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleAccept = async (id) => {
    setLoadingStates((prev) => ({ ...prev, [id]: "loading" }));
    try {
      const token = getToken();
      await axios.put(`http://localhost:8085/api/admin/users/approve/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Eliminar el usuario aceptado del estado actual
      setSolicitudes((prev) => prev.filter((solicitud) => solicitud.id !== id));
      setLoadingStates((prev) => ({ ...prev, [id]: "success" }));
    } catch (error) {
      console.error("Error al aceptar usuario:", error);
      setLoadingStates((prev) => ({ ...prev, [id]: "error" }));
    }
  };

  const handleDelete = async (id) => {
    setLoadingStates((prev) => ({ ...prev, [id]: "loading" }));
    try {
      const token = getToken();
      await axios.post(
        "http://localhost:8085/api/admin/users/delete",
        { userId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Eliminar el usuario eliminado del estado actual
      setSolicitudes((prev) => prev.filter((solicitud) => solicitud.id !== id));
      setLoadingStates((prev) => ({ ...prev, [id]: "success" }));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      setLoadingStates((prev) => ({ ...prev, [id]: "error" }));
    }
  };

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const filteredSolicitudes = solicitudes.filter((solicitud) =>
    solicitud.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastEntry = currentPage * entries;
  const indexOfFirstEntry = indexOfLastEntry - entries;
  const currentSolicitudes = filteredSolicitudes.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredSolicitudes.length / entries);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderAdmin />
        <main className="p-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Solicitudes de Registro</h1>
              <button
                onClick={fetchSolicitudes}
                disabled={isFetching}
                className={`py-2 px-4 rounded ${
                  isFetching
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {isFetching ? "Recargando..." : "Recargar"}
              </button>
            </div>

            {/* Controles superiores */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <label htmlFor="entries" className="mr-2">Mostrar:</label>
                <select
                  id="entries"
                  value={entries}
                  onChange={(e) => setEntries(Number(e.target.value))}
                  className="bg-gray-700 text-white p-2 rounded"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-700 text-white p-2 rounded"
              />
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Usuario</th>
                    <th className="p-3">Empresa</th>
                    <th className="p-3">Correo</th>
                    <th className="p-3">Teléfono</th>
                    <th className="p-3">Rol</th>
                    <th className="p-3">Permiso</th>
                    <th className="p-3">Acciones</th>
                    <th className="p-3">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSolicitudes.map((solicitud, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-gray-600" : "bg-gray-700"}
                    >
                      <td className="p-3">{solicitud.id}</td>
                      <td className="p-3">{solicitud.username}</td>
                      <td className="p-3">{solicitud.businessName}</td>
                      <td className="p-3">{solicitud.email}</td>
                      <td className="p-3">{solicitud.phoneNumber}</td>
                      <td className="p-3">{solicitud.role}</td>
                      <td className="p-3">{solicitud.permiso ? "Sí" : "No"}</td>
                      <td className="p-3 flex space-x-2">
                        <button
                          onClick={() => handleAccept(solicitud.id)}
                          className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                        >
                          Aceptar
                        </button>
                        <button
                          onClick={() => handleDelete(solicitud.id)}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                        >
                          Eliminar
                        </button>
                      </td>
                      <td className="p-3">
                        {loadingStates[solicitud.id] === "loading" && (
                          <span className="text-yellow-500">Cargando...</span>
                        )}
                        {loadingStates[solicitud.id] === "success" && (
                          <span className="text-green-500">✔</span>
                        )}
                        {loadingStates[solicitud.id] === "error" && (
                          <span className="text-red-500">✘</span>
                        )}
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
