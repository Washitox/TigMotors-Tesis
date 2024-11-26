import React from "react";
import logo from "../../../../assets/images/TigMotors.png";

export default function HeaderAdmin() {
  const handleLogout = () => {
    // Aquí puedes agregar lógica para cerrar sesión
    window.location.href = "/login"; // Redirige al login
  };

  return (
    <header className="bg-gray-900 h-20 flex items-center justify-center">
      {/* Contenedor centrado */}
      <div className="flex flex-col items-center text-center">
        {/* Logo */}
        <img src={logo} alt="TigMotors" className="h-10 rounded-full mb-2" />

        {/* Texto y línea divisoria */}
        <div>
          <span className="text-lg font-bold text-white block">
            Mesa de servicios Administrador
          </span>
          <hr className="mt-2 border-gray-100 w-full" />
        </div>
      </div>
    </header>
  );
}
