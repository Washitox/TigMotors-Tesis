import React from "react";

export default function InformaciónTig() {
  return (
    <section className="py-12 bg-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start">
          {/* Información de Contacto */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <h2 className="text-3xl font-bold mb-4">Información de Contacto</h2>
            <ul className="text-lg text-gray-300 space-y-4">
              <li>
                <strong>Número de celular del Maestro Victor Baño:</strong>{" "}
                <span className="text-gray-100">+593 981615291</span>
              </li>
              <li>
                <strong>Número de celular del personal Eliana Estrada:</strong>{" "}
                <span className="text-gray-100">+593 996316166</span>
              </li>
              <li>
                <strong>Correo electrónico personal:</strong>{" "}
                <span className="text-gray-100">timotors@yahoo.com</span>
              </li>
              <li>
                <strong>Correo electrónico de la página web:</strong>{" "}
                <span className="text-gray-100">tigmotors.inc.uio@gmail.com</span>
              </li>
            </ul>

            <h3 className="text-2xl font-semibold mt-8 mb-4">Ubicación</h3>
            <p className="text-lg text-gray-300">
              Sector Gualo, Calles la Dolorosa y 2 de Agosto
            </p>
          </div>

          {/* Mapa */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d249.36288114660718!2d-78.4377263426477!3d-0.1418183000041835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d5995d0812345b%3A0x6b8d8907f246f474!2sSector%20Gualo%2C%20Calles%20la%20Dolorosa%20y%202%20de%20Agosto!5e0!3m2!1ses!2sec!4v1732121359276!5m2!1ses!2sec"
              width="100%"
              height="450"
              style={{ border: "0", borderRadius: "10px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Tig Motors"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
