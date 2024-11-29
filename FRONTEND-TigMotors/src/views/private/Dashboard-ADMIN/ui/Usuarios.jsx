import React, { useState } from "react";
import Sidebar from "./Sidebar";
import HeaderAdmin from "./HeaderAdmin";
import { useForm } from "react-hook-form";
import { Input, Label, Button } from "keep-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

function Usuarios() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Define showPassword aquí

  const getToken = () => localStorage.getItem("authToken");

  const FormError = ({ message }) => (
    <div className="block font-medium text-red-500 text-sm">{message}</div>
  );

  const onSubmit = async (data) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const formattedData = {
        username: data.username,
        password: data.password,
        business_name: data.businessName,
        email: data.email,
        phone_number: `+593${data.phoneNumber}`,
      };

      const response = await axios.post(
        "http://localhost:8085/api/admin/registrar-usuario",
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      setSuccessMessage("Usuario registrado... recargue la página");
    } catch (error) {
      console.error("Error al registrar usuario:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message || "Ocurrió un error. Intente nuevamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
                    type="text"
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
                        value: /^(?=.*[A-Z])(?=.*[!@#$&*]).*$/,
                        message: "Debe contener una mayúscula y un carácter especial",
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

          {/* Espacio para la tabla de usuarios */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex-1">
            <h2 className="text-xl font-bold mb-4">Tabla de Usuarios</h2>
            <p className="text-gray-400">
              Aquí aparecerá la lista de usuarios registrados.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Usuarios;
