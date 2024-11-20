import React from "react";

export default function FinalLanding() {
  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Columna 1 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Servicios</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>Soldadura</li>
              <li>Pruebas Hidrostáticas</li>
              <li>Cepillados</li>
              <li>Torno</li>
              <li>Extras</li>
            </ul>
          </div>

          {/* Columna 2 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Compañía</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>Acerca de nosotros</li>
              <li>Equipo</li>
              
              
              
            </ul>
          </div>

          {/* Columna 3 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Recursos</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>Términos y condiciones</li>
              <li>Política de privacidad</li>

              
            </ul>
          </div>

          {/* Columna 4 */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contáctanos</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>Correo: tigmotors.inc.uio@gmail.com</li>
              <li>Teléfono: +593 981615291</li>
              <li>WhatsApp: +593 981615291</li>
              <li>
                <a
                  href="https://www.facebook.com"
                  className="text-indigo-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com"
                  className="text-indigo-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <hr className="my-8 border-gray-700" />

        {/* Derechos reservados */}
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Tig Motors. Todos los derechos
            reservados.
          </p>
          <div className="flex space-x-4 mt-4 lg:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-indigo-400 transition-colors"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-indigo-400 transition-colors"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-indigo-400 transition-colors"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-indigo-400 transition-colors"
              aria-label="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
