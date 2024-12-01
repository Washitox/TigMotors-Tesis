import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import HeaderAdmin from "./HeaderAdmin";
import { useForm } from "react-hook-form";
import { Input, Label, Button } from "keep-react";
import { FaEye, FaEyeSlash, FaPencilAlt, FaSave } from "react-icons/fa";
import axios from "axios";

function Usuarios() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();


  const fetchById = async (id) => {
    try {
      const token = getToken();
      const response = await axios.post(
        "http://localhost:8085/api/admin/buscar-usuario",
        { id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Si se encuentra, reemplazar las solicitudes con el único resultado
      setSolicitudes([response.data]);
    } catch (error) {
      console.error("Error al buscar usuario por ID:", error);
      setSolicitudes([]); // Vaciar la tabla si no se encuentra
    }
  };

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [users, setUsers] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


  
  const getToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setErrorMessage("Sesión expirada. Por favor, inicia sesión nuevamente.");
      return null;
    }
    return token;
  };


  const fetchUsers = async () => {
    try {
      const token = getToken();
      if (!token) return;
      const response = await axios.get("http://localhost:8085/api/admin/lista-usuarios", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  const fetchByIdOrName = async () => {
    try {
      const token = getToken();
      if (!token) return;
      if (!isNaN(searchTerm)) {
        const response = await axios.post(
          "http://localhost:8085/api/admin/buscar-usuario",
          { id: parseInt(searchTerm) },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUsers([response.data]);
      } else if (searchTerm.trim() !== "") {
        const filteredUsers = users.filter((user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setUsers(filteredUsers);
      } else {
        fetchUsers();
      }
    } catch (error) {
      console.error("Error al buscar usuario:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);



  const FormError = ({ message }) => (
    <div className="block font-medium text-red-500 text-sm">{message}</div>
  );

  const onSubmit = async (data) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    const formattedData = {
      username: data.username,
      password: data.password,
      business_name: data.businessName,
      email: data.email,
      phone_number: `+593${data.phoneNumber}`,
    };

    try {
      const token = getToken();
      if (!token) return; // Si no hay token, detén la ejecución

      const response = await axios.post(
        "http://localhost:8085/api/admin/registrar-usuario",
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccessMessage("Usuario registrado... recargue la página");
      fetchUsers(); // Actualizar la lista de usuarios después de registrar uno nuevo
    } catch (error) {
      if (error.response && error.response.data) {
        const backendErrors = error.response.data;
        if (backendErrors.password) {
          setError("password", {
            type: "server",
            message: backendErrors.password,
          });
        }
        if (backendErrors.phone_number) {
          setError("phoneNumber", {
            type: "server",
            message: backendErrors.phone_number,
          });
        }
        setErrorMessage(
          backendErrors.message || "Ocurrió un error inesperado. Intente nuevamente."
        );
      } else {
        setErrorMessage("Error desconocido. Intente nuevamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleEdit = (id) => {
    console.log("Editar usuario con ID:", id);
    setLoadingStates((prev) => ({ ...prev, [id]: "editing" }));
  };

  const handleSave = (id) => {
    console.log("Guardar cambios para usuario con ID:", id);
    setLoadingStates((prev) => ({ ...prev, [id]: "saved" }));
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar para la navegación */}
      <Sidebar />

      {/* Contenedor principal */}
      <div className="flex-1 flex flex-col">
        {/* Header superior */}
        <HeaderAdmin />

        {/* Contenido de la página */}
        <main className="p-6 flex gap-6">
          {/* Sección del formulario de registro */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-1/4">
            <h1 className="text-xl font-bold mb-4">Registrar Usuario</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Username */}
              <fieldset className="space-y-1">
                <Label htmlFor="username">
                  Nombre de usuario <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Ingrese su nombre de usuario"
                  {...register("username", {
                    required: "El nombre de usuario es requerido",
                    minLength: { value: 5, message: "Debe tener al menos 5 caracteres" },
                  })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
                {errors.username && <FormError message={errors.username.message} />}
              </fieldset>

              {/* Business Name */}
              <fieldset className="space-y-1">
                <Label htmlFor="businessName">
                  Nombre del negocio <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="businessName"
                  type="text"
                  placeholder="Ingrese el nombre del negocio"
                  {...register("businessName", {
                    required: "El nombre del negocio es requerido",
                  })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
                {errors.businessName && <FormError message={errors.businessName.message} />}
              </fieldset>

              {/* Email */}
              <fieldset className="space-y-1">
                <Label htmlFor="email">
                  Correo electrónico <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Correo electrónico"
                  {...register("email", {
                    required: "El correo electrónico es requerido",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Ingrese un correo electrónico válido",
                    },
                  })}
                  className="bg-gray-700 border-gray-600 text-white"
                />
                {errors.email && <FormError message={errors.email.message} />}
              </fieldset>

              {/* Phone Number */}
              <fieldset className="space-y-1">
                <Label htmlFor="phoneNumber">
                  Número celular <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center">
                  <span className="bg-gray-700 text-white px-3 py-2 rounded-l-md">+593</span>
                  <Input
                    id="phoneNumber"
                    type="number"
                    placeholder="Ingrese 9 dígitos"
                    {...register("phoneNumber", {
                      required: "El número celular es requerido",
                      pattern: {
                        value: /^\d{9}$/,
                        message: "Debe contener exactamente 9 dígitos",
                      },
                    })}
                    className="bg-gray-700 border-gray-600 text-white rounded-r-md"
                  />
                </div>
                {errors.phoneNumber && <FormError message={errors.phoneNumber.message} />}
              </fieldset>

              {/* Password */}
              <fieldset className="space-y-1 relative">
                <Label htmlFor="password">
                  Contraseña <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingrese su contraseña"
                    {...register("password", {
                      required: "La contraseña es requerida",
                      minLength: { value: 8, message: "Debe tener al menos 8 caracteres" },
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[a-z])(?=.*\d).*$/,
                        message:
                          "Debe contener una mayúscula, minúscula, un dígito y un carácter especial",
                      },
                    })}
                    className="bg-gray-700 border-gray-600 text-white w-full pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && <FormError message={errors.password.message} />}
              </fieldset>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-500 hover:bg-green-600"
              >
                {isSubmitting ? "Registrando..." : "Solicitar Registro"}
              </Button>
            </form>
            {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
          </div>

          {/* Tabla de usuarios */}

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Tabla de Usuarios</h2>
              <div className="flex gap-2">
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="bg-gray-700 text-white p-2 rounded"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
                <button
                  onClick={fetchUsers}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Recargar
                </button>
                <input
                  type="text"
                  placeholder="Buscar por ID o Nombre"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-700 text-white p-2 rounded"
                />
                <button
                  onClick={fetchByIdOrName}
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                >
                  Buscar
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Usuario</th>
                    <th className="p-3">Empresa</th>
                    <th className="p-3">Correo</th>
                    <th className="p-3">Teléfono</th>
                    <th className="p-3">Acciones</th>
                    <th className="p-3">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user, idx) => (
                    <tr
                      key={user.id}
                      className={idx % 2 === 0 ? "bg-gray-600" : "bg-gray-700"}
                    >
                      <td className="p-3">{user.id}</td>
                      <td className="p-3">{user.username}</td>
                      <td className="p-3">{user.businessName}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.phoneNumber}</td>
                      <td className="p-3 flex space-x-2">
                        <button
                          onClick={() => handleEdit(user.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                        >
                          <FaPencilAlt />
                        </button>
                        <button
                          onClick={() => handleSave(user.id)}
                          className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                        >
                          <FaSave />
                        </button>
                      </td>
                      <td className="p-3">
                        {loadingStates[user.id] === "editing" && (
                          <span className="text-yellow-500">Editando...</span>
                        )}
                        {loadingStates[user.id] === "saved" && (
                          <span className="text-green-500">Guardado</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
              >
                Anterior
              </button>
              <span>
                Página {currentPage} de {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
              >
                Siguiente
              </button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

export default Usuarios;
