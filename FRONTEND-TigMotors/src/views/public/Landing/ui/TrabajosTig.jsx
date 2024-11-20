import React from "react";
import image1 from "../../../../assets/images/image1.png";
import image2 from "../../../../assets/images/image2.png";
import image3 from "../../../../assets/images/image3.png";
import image4 from "../../../../assets/images/image4.png";
import image5 from "../../../../assets/images/image5.png";

export default function TrabajosTig() {
  const trabajos = [
    {
      title: "Soldadura",
      image: image1,
      description: [
        "Suelda en frío",
        "Suelda en Injerto",
        "Relleno de superficies",
      ],
    },
    {
      title: "Pruebas Hidrostática",
      image: image2,
      description: [
        "Verificación",
        "Diagnóstico",
        "Fisuras en Bloc o Cabezotes",
      ],
    },
    {
      title: "Cepillados",
      image: image3,
      description: ["Nivelación de superficies"],
    },
    {
      title: "Torno",
      image: image4,
      description: ["Fabricación de piezas"],
    },
    {
      title: "Extras",
      image: image5,
      description: [
        "Cambio de camisillas",
        "Colocación de Helicoides",
        "Colocación de Tintas",
        "Asesoría de sueldas",
        "Lavado de Bloc o Cabezotes",
        "Servicio de transporte de piezas (Sector norte bajo – Amazonas hasta Carapungo)",
      ],
    },
  ];

  return (
    <section className="py-12 bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-8">Nuestros Servicios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trabajos.slice(0, 3).map((trabajo, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:scale-105 transition duration-300"
              style={{ minHeight: "500px" }}
            >
              <img
                src={trabajo.image}
                alt={trabajo.title}
                className="w-20 h-20 mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold mb-2">{trabajo.title}</h3>
              <ul className="text-gray-400 text-sm">
                {trabajo.description.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center mt-6">
          {trabajos.slice(3).map((trabajo, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl hover:scale-105 transition duration-300"
              style={{ minHeight: "500px" }}
            >
              <img
                src={trabajo.image}
                alt={trabajo.title}
                className="w-20 h-20 mb-4 rounded-lg"
              />
              <h3 className="text-xl font-semibold mb-2">{trabajo.title}</h3>
              <ul className="text-gray-400 text-sm">
                {trabajo.description.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
