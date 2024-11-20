import React from "react";

export default function Home() {
  return (
    <header className="bg-gray-900 py-12">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold text-indigo-300">
          Bienvenido a TigMotors
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          Especialistas en soldadura de alta precisión y reparación de cabezotes. Transformamos la calidad en eficiencia.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <a
          
            href="https://wa.me/593981615291"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Contactar Ahora
          </a>
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
            Más Información
          </button>
        </div>
      </div>
    </header>
  );
}
