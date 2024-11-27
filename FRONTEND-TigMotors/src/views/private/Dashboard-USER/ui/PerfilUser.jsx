import React, { useEffect, useState } from "react";
import HeaderUsuario from "./HeaderUsuario"; // Ajusta la ruta según tu estructura de carpetas
import SidebarUser from "./SidebarUser"; // Ajusta la ruta según tu estructura de carpetas
import axios from "axios";

function PerfilUser() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    businessName: "",
    email: "",
    phoneNumber: "",
  });

  const getToken = () => localStorage.getItem("authToken");

  const fetchUserInfo = async () => {
    try {
      const token = getToken();
      const response = await axios.get("http://localhost:8085/api/admin/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar del usuario */}
      <SidebarUser />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Header del usuario */}
        <HeaderUsuario />

        {/* Contenido del perfil */}
        <main className="p-6">
          <div className="bg-gray-800 p-6 rounded-lg max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">Perfil del Usuario</h1>

            {/* Información del perfil */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400">Nombre</label>
                <div className="p-3 bg-gray-700 rounded-md">{userInfo.username || "N/A"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Empresa</label>
                <div className="p-3 bg-gray-700 rounded-md">
                  {userInfo.businessName || "No especificado"}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Correo Electrónico</label>
                <div className="p-3 bg-gray-700 rounded-md">{userInfo.email || "N/A"}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Teléfono</label>
                <div className="p-3 bg-gray-700 rounded-md">
                  {userInfo.phoneNumber || "No especificado"}
                </div>
              </div>
            </div>

            {/* Opciones de acciones */}
            <div className="mt-6 space-y-4">
              <button className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-semibold">
                Editar Perfil
              </button>
              <button className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 rounded-md text-white font-semibold">
                Cambiar Contraseña
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PerfilUser;
