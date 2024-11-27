import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import HeaderAdmin from './HeaderAdmin';
import Estatus from './Estatus';
import axios from 'axios';

function Perfil() {
  const [profileData, setProfileData] = useState({
    username: '',
    businessName: '',
    email: '',
    phoneNumber: '',
  });

  const [isLoading, setIsLoading] = useState(true);

  const getToken = () => localStorage.getItem('authToken');

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      const token = getToken();
      const response = await axios.get('http://localhost:8085/api/admin/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfileData(response.data);
    } catch (error) {
      console.error('Error al obtener los datos del perfil:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <HeaderAdmin />

        {/* Contenido de la página */}
        <main className="p-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Perfil de Usuario</h1>

            {/* Sección de información del perfil */}
            {isLoading ? (
              <p className="text-center text-gray-400">Cargando datos del perfil...</p>
            ) : (
              <div>
                {/* Contenedor de la información del perfil */}
                <div className="bg-gray-700 p-4 rounded-lg w-full max-w-md mx-auto">
                  <h2 className="text-lg font-bold mb-4 text-center">Información Básica</h2>
                  <table className="table-fixed w-full text-sm text-left text-gray-200 border border-gray-600 rounded-lg">
                    <tbody>
                      <tr>
                        <td className="p-2 font-bold w-1/3">Nombre:</td>
                        <td className="p-2">{profileData.username || 'No disponible'}</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold w-1/3">Empresa:</td>
                        <td className="p-2">{profileData.businessName || 'No disponible'}</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold w-1/3">Correo:</td>
                        <td className="p-2">{profileData.email || 'No disponible'}</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-bold w-1/3">Teléfono:</td>
                        <td className="p-2">{profileData.phoneNumber || 'No disponible'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Botones debajo del perfil */}
                <div className="flex space-x-4 justify-center mt-6">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                    Editar Perfil
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                    Cambiar Contraseña
                  </button>
                </div>

                {/* Contenedor de la gráfica */}
                <div className="bg-gray-700 p-4 rounded-lg mt-6 max-w-sm">
                  <h2 className="text-lg font-bold mb-4 text-center">Estadísticas</h2>
                  <div className="h-30">
                    <Estatus />
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Perfil;
